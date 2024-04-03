import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, ArrayContains } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ClerkRole, User } from './user.entity';
import { users } from '@clerk/clerk-sdk-node';
import { CredentialsService } from 'src/credentials/credentials.service';
import { JustNonceDto } from './dto/just-nonce.dto';

import { ConfigService } from '@nestjs/config';
import { resolveTxt } from 'dns';
import {
  CreateTxtRecordForDomainResponse,
  CreateWellKnownForDidWebResponse,
} from './users.types';
import { Cron, CronExpression } from '@nestjs/schedule';
import { domainVerificationPrefix } from 'src/credentials/credentials.constants';
import { HttpService } from '@nestjs/axios';
import * as https from 'https';
import { map } from 'rxjs';
import { AVAILABLE_CREDENTIALS, LicciumIssuer } from './users.constants';
import { IssuerWithVerifiedCredentials } from 'src/shared/typings/Issuer';
import { IssuerConnectionStatus } from 'src/shared/typings/IssuerConnectionStatus';
import { CredentialType } from 'src/shared/typings/CredentialType';
import {
  Connection,
  ConnectionStatus,
} from 'src/connections/connection.entity';
import { ConnectionsService } from 'src/connections/connections.service';
import { Creator } from 'src/shared/typings/Creator';
import { CredentialVerificationStatus } from 'src/shared/typings/CredentialVerificationStatus';
import { CreatorVerificationStatus } from 'src/shared/typings/CreatorVerificationStatus';
import { VerifiedCredentialsUnion } from 'src/shared/typings/Credentials';
import { formatCredentialForUnion } from 'src/credentials/credentials.formatters';
import {
  checkSignatureAndThrow,
  generateDomainRecord,
  generateAlfaNumericIdentifier,
  generateWellKnownForDidWeb,
} from 'src/shared/helpers';
import { mapIssuerConnectionToCreator } from './users.formatters';
import * as keygen from 'keygen';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private credentialsService: CredentialsService,
    private configService: ConfigService,
    private httpService: HttpService,
    private connectionsService: ConnectionsService,
  ) {}

  private generateNonce() {
    return Math.floor(Math.random() * 1000000000).toString();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.clerkId = createUserDto.clerkId;
    newUser.clerkRole = createUserDto.clerkRole;

    const nonce = this.generateNonce();
    newUser.nonce = nonce;

    newUser.didKey = keygen.hex(keygen.large);

    const user = await this.userRepository.save(newUser, { reload: true });
    const userFromClerk = await users.getUser(createUserDto.clerkId);

    const email = userFromClerk.emailAddresses[0].emailAddress;

    await this.credentialsService.createEmailCredential(
      { email, did: user.didKey },
      user,
    );
    return user;
  }

  async getByClerkId(clerkId: string): Promise<User> {
    return this.userRepository.findOne({ where: { clerkId } });
  }

  async getCreatorOfIssuer(
    creatorId: number,
    user: User,
  ): Promise<{
    creator: Creator;
    credentials: VerifiedCredentialsUnion[];
  }> {
    const connection = user.issuedConnections.find(
      (c) => c.creatorId === creatorId,
    );
    if (!connection) {
      throw new NotFoundException(
        'This creator is not related to this issuer yet.',
      );
    }
    const creator = await this.userRepository.findOne({
      where: {
        id: connection.creatorId,
      },
    });

    return {
      creator: mapIssuerConnectionToCreator(connection, creator),
      credentials: creator.credentials.map(formatCredentialForUnion),
    };
  }

  async getAllCreatorsOfIssuer(
    user: User,
    status: CreatorVerificationStatus = CreatorVerificationStatus.Accepted,
  ): Promise<Creator[]> {
    let filterStatus =
      status === CreatorVerificationStatus.Accepted
        ? ConnectionStatus.Accepted
        : ConnectionStatus.Requested;
    const connections = user.issuedConnections.filter(
      (c) => c.status === filterStatus,
    );

    const usersIds = connections.map((c) => c.creatorId);
    const users = await this.userRepository.find({
      where: {
        id: In(usersIds),
      },
    });

    const creators = connections.map((connection, index) =>
      mapIssuerConnectionToCreator(connection, users[index]),
    );

    return creators;
  }

  async getIssuer(
    issuerId: number,
    user: User,
  ): Promise<IssuerWithVerifiedCredentials> {
    const issuer = await this.userRepository.findOne({
      where: {
        clerkRole: ClerkRole.Issuer,
        id: issuerId,
      },
    });

    return this.mapUserToIssuerResponse(issuer, user);
  }

  async getAllIssuers(user: User): Promise<IssuerWithVerifiedCredentials[]> {
    const issuers = await this.userRepository.find({
      where: {
        clerkRole: ClerkRole.Issuer,
        credentialsToIssue: ArrayContains<CredentialType>([
          CredentialType.EMail,
        ]),
      },
    });
    // const filteredIssuer = issuers.filter((issuer) =>
    //   issuer.issuedConnections.find(
    //     (c) =>
    //       c.creatorId === user.id && c.status === ConnectionStatus.Accepted,
    //   ),
    // );
    return this.mapUsersToIssuerResponse(issuers, user);
  }

  private mapUserToIssuerResponse(issuer: User, creator: User) {
    const statusesToCheck = [
      ConnectionStatus.Accepted,
      ConnectionStatus.Requested,
    ];

    const connections = issuer.issuedConnections.filter(
      (c) =>
        c.creatorId === creator.id &&
        statusesToCheck.find((s) => s === c.status),
    );

    let status = IssuerConnectionStatus.NotStarted;
    connections.every((c) => {
      switch (c.status) {
        case ConnectionStatus.Accepted:
          status = IssuerConnectionStatus.Connected;
          return false;
        case ConnectionStatus.Requested:
          status = IssuerConnectionStatus.Pending;
          break;
      }
    });
    return {
      id: issuer.id.toString(),
      name: issuer.name,
      description: issuer.description,
      imageUrl: issuer.imageUrl,
      data: {
        domain: issuer.domain,
        requirements: 'Info about requirements',
      },
      fees: false,
      status,
      vcs: AVAILABLE_CREDENTIALS,
    };
  }

  private mapUsersToIssuerResponse(
    issuers: User[],
    creator: User,
  ): IssuerWithVerifiedCredentials[] {
    return issuers.map((issuer) =>
      this.mapUserToIssuerResponse(issuer, creator),
    );
  }

  async updateNonce(clerkId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ clerkId });
    if (!user) {
      throw new NotFoundException();
    }
    user.nonce = this.generateNonce();
    user.nonceChangedAt = new Date();
    return this.userRepository.save(user);
  }

  async provideNonceForUser(clerkId: string): Promise<JustNonceDto> {
    const user = await this.userRepository.findOneBy({ clerkId });

    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = await this.updateNonce(user.clerkId);

    return { nonce: updatedUser.nonce };
  }

  async verifySignatureAndConnectAddress(
    clerkId: string,
    address: string,
    signedMessage: string,
  ): Promise<any> {
    const userByAddress = await this.userRepository.findOneBy({
      publicAddress: address,
    });
    if (userByAddress) {
      throw new NotFoundException(
        'Public address already assigned to another user.',
      );
    }

    const termsAndConditionsUrl = this.configService.getOrThrow(
      'TERMS_AND_CONDITIONS_URL',
    );

    const user = await this.getByClerkId(clerkId);

    checkSignatureAndThrow(
      user.nonce,
      address,
      signedMessage,
      termsAndConditionsUrl,
    );

    user.publicAddress = address;
    const updatedUser = await this.userRepository.save(user, { reload: true });
    await this.credentialsService.createWalletCredential(
      { publicAddress: address, did: address },
      updatedUser,
    );

    return updatedUser;
  }

  async disconnectAddress(clerkId: string) {
    const user = await this.userRepository.findOneBy({ clerkId });

    user.publicAddress = null;
    const updatedUser = await this.userRepository.save(user, { reload: true });

    await this.credentialsService.removeWalletCredential(updatedUser);
    return updatedUser;
  }

  async receiveAndUpdateDomainRecord(
    user: User,
    domain: string,
  ): Promise<CreateTxtRecordForDomainResponse> {
    if (user.domain && domain === user.domain && user.domainRecord) {
      return {
        txtRecord: user.domainRecord,
      };
    }
    await this.credentialsService.removeDomainCredential(user);

    user.domainRecord = generateDomainRecord();
    user.domain = domain;
    user.domainPendingVerifcation = false;
    user.domainRecordChangedAt = new Date();

    const updatedUser = await this.userRepository.save(user, { reload: true });

    return {
      txtRecord: updatedUser.domainRecord,
    };
  }

  async confirmDomainRecordCreated(user: User) {
    await this.credentialsService.removeDomainCredential(user);

    user.domainPendingVerifcation = true;
    await this.userRepository.save(user, { reload: true });

    await this.credentialsService.createPendingDomainCredential(
      { did: user.domain, domain: user.domain },
      user,
    );

    this.verifyDomainRecordAndConnect(user);
  }

  async resolveTxtOnDomain(domain: string): Promise<string[][]> {
    return new Promise((resolve, reject) => {
      resolveTxt(domain, (err, addresses) => {
        if (err) {
          reject(err);
        }
        resolve(addresses);
      });
    });
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkUserDomains() {
    const users = await this.userRepository.find({
      where: { domainPendingVerifcation: true },
    });
    users.forEach((user) => this.verifyDomainRecordAndConnect(user));
  }

  private async verifyDomainRecordAndConnect(user: User) {
    const records = await this.resolveTxtOnDomain(user.domain);

    const creatorCredentialsMessagesFromRecords = records.filter((record) =>
      record.some((value) => value.includes(domainVerificationPrefix)),
    );

    const doesValuePresented = creatorCredentialsMessagesFromRecords.some(
      (record) => record.some((value) => value === user.domainRecord),
    );
    if (doesValuePresented) {
      await this.credentialsService.createDomainCredential(
        { did: user.domain, domain: user.domain },
        user,
      );
      await this.userRepository.update(
        { clerkId: user.clerkId },
        { domainPendingVerifcation: false },
      );
    }
  }

  async disconnectDomain(clerkId: string) {
    const user = await this.userRepository.findOneBy({ clerkId });

    user.domain = null;
    user.domainRecord = null;
    user.domainPendingVerifcation = false;
    user.domainRecordChangedAt = new Date();
    const updatedUser = await this.userRepository.save(user, { reload: true });

    await this.credentialsService.removeDomainCredential(updatedUser);
    return updatedUser;
  }

  async receiveAndUpdateDidWebWellKnown(
    user: User,
    didWeb: string,
  ): Promise<CreateWellKnownForDidWebResponse> {
    if (user.didWeb && didWeb === user.didWeb && user.didWebWellKnown) {
      return {
        wellKnownJsonString: `// ${user.didWebWellKnownChangedAt.toUTCString()}
      // https://www.${didWeb}/.well-known/did.json
        ${JSON.stringify(user.didWebWellKnown, null, 2)}
      `,
      };
    }

    await this.credentialsService.removeDidWebCredential(user);
    user.didWeb = didWeb;
    user.didWebWellKnown = generateWellKnownForDidWeb(didWeb);
    user.didWebPendingVerifcation = false;
    user.didWebWellKnownChangedAt = new Date();

    const updatedUser = await this.userRepository.save(user, { reload: true });

    return {
      wellKnownJsonString: JSON.stringify(updatedUser.didWebWellKnown, null, 2),
    };
  }

  async confirmDidWebWellKnownCreated(user: User) {
    user.didWebPendingVerifcation = true;
    await this.userRepository.save(user, { reload: true });
    await this.credentialsService.removeDidWebCredential(user);

    await this.credentialsService.createPendingDidWebCredential(
      { did: user.domain, didWeb: user.didWeb },
      user,
    );

    this.verifyDidWebWellKnownAndConnect(user);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkUsersDidWeb() {
    try {
      const users = await this.userRepository.find({
        where: { didWebPendingVerifcation: true },
      });
      users.forEach((user) => this.verifyDidWebWellKnownAndConnect(user));
    } catch (error) {
      console.log(error);
    }
  }

  private async getDidWebWellKnowOfUser(user: User): Promise<any> {
    const didWebFromServer = await this.httpService
      .get(`https://${user.didWeb}/.well-known/did.json`, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      })
      .pipe(map((response) => response.data))
      .toPromise();

    return didWebFromServer;
  }

  private async verifyDidWebWellKnownAndConnect(user: User) {
    const wellKnown = await this.getDidWebWellKnowOfUser(user);
    const toCompare = user.didWebWellKnown;
    const doesWellKnowMatch =
      wellKnown.verificationMethod[0].publicKeyJwk.x ===
      toCompare.verificationMethod[0].publicKeyJwk.x;

    if (doesWellKnowMatch) {
      await this.credentialsService.createDidWebCredential(
        { did: user.domain, didWeb: user.didWeb },
        user,
      );
      await this.userRepository.update(
        { clerkId: user.clerkId },
        { didWebPendingVerifcation: false },
      );
    }
  }

  async disconnectDidWeb(clerkId: string) {
    const user = await this.userRepository.findOneBy({ clerkId });

    user.didWeb = null;
    user.didWebWellKnown = null;
    user.didWebPendingVerifcation = false;
    user.didWebWellKnownChangedAt = new Date();
    const updatedUser = await this.userRepository.save(user, { reload: true });

    await this.credentialsService.removeDidWebCredential(updatedUser);
    return updatedUser;
  }

  async acceptConnection(creatorId: number, user: User) {
    const creator = await this.userRepository.findOne({
      where: {
        clerkRole: ClerkRole.Creator,
        id: creatorId,
      },
    });
    await this.connectionsService.acceptConnection([creator, user]);
  }

  async rejectConnection(creatorId: number, user: User) {
    const creator = await this.userRepository.findOne({
      where: {
        clerkRole: ClerkRole.Creator,
        id: creatorId,
      },
    });
    await this.connectionsService.rejectConnection([creator, user]);
  }

  async createConnection(issuerId: number, user: User) {
    const issuer = await this.userRepository.findOne({
      where: {
        clerkRole: ClerkRole.Issuer,
        id: issuerId,
      },
    });
    await this.connectionsService.createConnection([issuer, user]);
  }

  async revokeConnection(creatorId: number, user: User) {
    const creator = await this.userRepository.findOne({
      where: {
        clerkRole: ClerkRole.Creator,
        id: creatorId,
      },
    });
    await this.connectionsService.revokeConnection([creator, user]);
  }
}
