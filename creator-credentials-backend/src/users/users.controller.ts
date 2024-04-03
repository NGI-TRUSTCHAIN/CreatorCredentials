import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetClerkUserAuth } from './get-clerk-auth.decorator';
import { type AuthObject, clerkClient } from '@clerk/clerk-sdk-node';
import { ClerkRole, User } from './user.entity';
import { AuthGuard } from './guards/clerk-user.guard';
import { GetUser } from './get-user.decorator';
import { CredentialsService } from 'src/credentials/credentials.service';
import { CreatorVerificationStatus } from 'src/shared/typings/CreatorVerificationStatus';
import { CreateWellKnownForDidWebResponse } from './users.types';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly credentialsService: CredentialsService,
  ) {}

  @Post('register')
  async registerUser(@GetClerkUserAuth() auth: AuthObject) {
    const clerkUser = await clerkClient.users.getUser(auth.userId);

    let role: ClerkRole;
    switch (clerkUser.publicMetadata.role) {
      case 'CREATOR':
        role = ClerkRole.Creator;
        break;
      case 'ISSUER':
        role = ClerkRole.Issuer;
        break;
    }

    return this.usersService.create({
      clerkId: auth.userId,
      clerkRole: role,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUserById(@GetUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('creators')
  async getCreatorsWithFilter(
    @GetUser() user: User,
    @Query('status') status: CreatorVerificationStatus,
  ) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for issuers.');
    }
    const creators = await this.usersService.getAllCreatorsOfIssuer(
      user,
      status,
    );

    return {
      creators,
    };
  }

  @UseGuards(AuthGuard)
  @Get('creators/:creatorId')
  async getCreatorById(
    @GetUser() user: User,
    @Param('creatorId', ParseIntPipe) creatorId: number,
  ) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for issuers.');
    }
    const creatorsAndCredentials = await this.usersService.getCreatorOfIssuer(
      creatorId,
      user,
    );

    return creatorsAndCredentials;
  }

  @UseGuards(AuthGuard)
  @Post('creators/:creatorId/accept')
  async acceptCreatorConnection(
    @GetUser() user: User,
    @Param('creatorId', ParseIntPipe) creatorId: number,
  ) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for issuers.');
    }
    await this.usersService.acceptConnection(creatorId, user);
  }

  @UseGuards(AuthGuard)
  @Post('creators/:creatorId/reject')
  async rejectCreatorConnection(
    @GetUser() user: User,
    @Param('creatorId', ParseIntPipe) creatorId: number,
  ) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for issuers.');
    }
    await this.usersService.rejectConnection(creatorId, user);
  }

  @UseGuards(AuthGuard)
  @Post('creators/:creatorId/revoke')
  async revokeCreatorConnection(
    @GetUser() user: User,
    @Param('creatorId', ParseIntPipe) creatorId: number,
  ) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for issuers.');
    }
    await this.usersService.revokeConnection(creatorId, user);
  }

  @UseGuards(AuthGuard)
  @Get('issuers')
  async getIssuers(@GetUser() user: User) {
    if (user.clerkRole !== ClerkRole.Creator) {
      throw new NotFoundException('This api is only for creators.');
    }
    return this.usersService.getAllIssuers(user);
  }

  @UseGuards(AuthGuard)
  @Get('issuers/:issuerId')
  async getIssuer(
    @GetUser() user: User,
    @Param('issuerId', ParseIntPipe) issuerId: number,
  ) {
    if (user.clerkRole !== ClerkRole.Creator) {
      throw new NotFoundException('This api is only for creators.');
    }
    const issuer = await this.usersService.getIssuer(issuerId, user);
    return {
      issuer,
    };
  }
  @UseGuards(AuthGuard)
  @Post('issuers/:issuerId/confirm-request')
  async confirmIssuerRequest(
    @GetUser() user: User,
    @Param('issuerId', ParseIntPipe) issuerId: number,
  ) {
    await this.usersService.createConnection(issuerId, user);
  }

  @Get('check/:clerkId')
  async getUserByClerkId(@Param('clerkId') clerkId: string) {
    return this.usersService.getByClerkId(clerkId);
  }

  @UseGuards(AuthGuard)
  @Get('nonce')
  async provideNonceOfUser(@GetUser() user: User) {
    return this.usersService.provideNonceForUser(user.clerkId);
  }

  @UseGuards(AuthGuard)
  @Post('address/connect')
  async connectPublicAddressToUser(
    @GetUser() user: User,
    @Body('publicAddress') publicAddress: string,
    @Body('signedMessage') signedMessage: string,
  ) {
    return this.usersService.verifySignatureAndConnectAddress(
      user.clerkId,
      publicAddress,
      signedMessage,
    );
  }
  @UseGuards(AuthGuard)
  @Post('address/disconnect')
  async disconnectPublicAddressToUser(@GetUser() user: User) {
    return this.usersService.disconnectAddress(user.clerkId);
  }

  @UseGuards(AuthGuard)
  @Post('verification/domain/txt-record')
  @HttpCode(HttpStatus.CREATED)
  createTxtRecordForDomain(
    @GetUser() user: User,
    @Body('domain') domain: string,
  ) {
    return this.usersService.receiveAndUpdateDomainRecord(user, domain);
  }

  @UseGuards(AuthGuard)
  @Post('verification/domain/confirm')
  @HttpCode(HttpStatus.CREATED)
  confirmDomainTxtRecord(@GetUser() user: User) {
    return this.usersService.confirmDomainRecordCreated(user);
  }

  @UseGuards(AuthGuard)
  @Post('domain/disconnect')
  async disconnectDomainFromUser(@GetUser() user: User) {
    return this.usersService.disconnectDomain(user.clerkId);
  }

  @UseGuards(AuthGuard)
  @Post('verification/did-web/well-known')
  @HttpCode(HttpStatus.CREATED)
  createWellKnownForDidWeb(
    @GetUser() user: User,
    @Body('didWeb') didWeb: string,
  ): Promise<CreateWellKnownForDidWebResponse> {
    return this.usersService.receiveAndUpdateDidWebWellKnown(user, didWeb);
  }

  @UseGuards(AuthGuard)
  @Post('verification/did-web/confirm')
  @HttpCode(HttpStatus.CREATED)
  confirmDidWebWellKnown(@GetUser() user: User) {
    return this.usersService.confirmDidWebWellKnownCreated(user);
  }

  @UseGuards(AuthGuard)
  @Post('did-web/disconnect')
  async disconnectDidWebFromUser(@GetUser() user: User) {
    return this.usersService.disconnectDidWeb(user.clerkId);
  }
}
