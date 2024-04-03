import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  NotFoundException,
  ParseIntPipe,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateEmailCredentialDto } from './dto/create-email-credential.dto';
import { AuthGuard } from 'src/users/guards/clerk-user.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { ClerkRole, User } from 'src/users/user.entity';
import { CredentialVerificationStatus } from 'src/shared/typings/CredentialVerificationStatus';
import { formatCredentialForUnion } from './credentials.formatters';
import { CredentialType } from 'src/shared/typings/CredentialType';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @UseGuards(AuthGuard)
  @Post('create/email')
  async createEmailCredential(
    @Body() createCredentialDto: CreateEmailCredentialDto,
    @GetUser() user: User,
  ) {
    return this.credentialsService.createEmailCredential(
      createCredentialDto,
      user,
    );
  }

  @UseGuards(AuthGuard)
  @Get('issuers')
  async getIssuers(
    @GetUser() user: User,
    @Query('status') status: CredentialVerificationStatus,
  ) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for issuers.');
    }
    const credentials =
      await this.credentialsService.getAllIssuersMemberCredentialsWithCreators(
        user.id,
        status,
      );
    return { credentials: credentials.map(formatCredentialForUnion) };
  }

  @UseGuards(AuthGuard)
  @Get('issuer')
  async getCredentialsOfIssuer(@GetUser() user: User) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for Issuer.');
    }
    const [
      emailCredential,
      domainCredential,
      didWebCredential,
      memberShipCredentials,
    ] = await Promise.all([
      this.credentialsService.getCredentialsOfUserByType(
        user,
        CredentialType.EMail,
      ),
      this.credentialsService.getCredentialsOfUserByType(
        user,
        CredentialType.Domain,
      ),
      this.credentialsService.getCredentialsOfUserByType(
        user,
        CredentialType.DidWeb,
      ),
      user.issuedCredentials,
    ]);

    return {
      email: emailCredential[0] && formatCredentialForUnion(emailCredential[0]),
      domain:
        domainCredential[0] && formatCredentialForUnion(domainCredential[0]),
      didWeb:
        didWebCredential[0] && formatCredentialForUnion(didWebCredential[0]),
      membership: memberShipCredentials.map(formatCredentialForUnion),
    };
  }
  @UseGuards(AuthGuard)
  @Get('creator')
  async getCredentialsOfCreator(@GetUser() user: User) {
    if (user.clerkRole !== ClerkRole.Creator) {
      throw new NotFoundException('This api is only for creators.');
    }

    const [
      emailCredential,
      walletCredential,
      domainCredential,
      memberShipCredentials,
    ] = await Promise.all([
      this.credentialsService.getCredentialsOfUserByType(
        user,
        CredentialType.EMail,
      ),
      this.credentialsService.getCredentialsOfUserByType(
        user,
        CredentialType.Wallet,
      ),
      this.credentialsService.getCredentialsOfUserByType(
        user,
        CredentialType.Domain,
      ),
      this.credentialsService.getCredentialsOfUserByType(
        user,
        CredentialType.Member,
      ),
    ]);

    return {
      email: emailCredential[0] && formatCredentialForUnion(emailCredential[0]),
      wallet:
        walletCredential[0] && formatCredentialForUnion(walletCredential[0]),
      domain:
        domainCredential[0] && formatCredentialForUnion(domainCredential[0]),
      membership: memberShipCredentials.map(formatCredentialForUnion),
    };
  }

  @UseGuards(AuthGuard)
  @Post('request')
  async requestCredentialsFromIssuer(
    @GetUser() user: User,
    @Body('issuerId', ParseIntPipe) issuerId: number,
  ) {
    if (user.clerkRole !== ClerkRole.Creator) {
      throw new NotFoundException('This api is only for creators.');
    }
    return this.credentialsService.createPendingMemberCredential(
      { value: user.domain, did: user.domain },
      user,
      issuerId,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':credentialId/accept')
  async acceptCredentialByIssuer(
    @GetUser() user: User,
    @Param('credentialId', ParseIntPipe) credentialId: number,
  ) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for Issuers.');
    }

    return this.credentialsService.createMemberCredential(user, credentialId);
  }

  @UseGuards(AuthGuard)
  @Post(':credentialId/reject')
  async rejectCredentialByIssuer(
    @GetUser() user: User,
    @Param('credentialId', ParseIntPipe) credentialId: number,
  ) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for Issuers.');
    }

    return this.credentialsService.removeMemberCredential(credentialId);
  }

  @UseGuards(AuthGuard)
  @Delete(':credentialId')
  async deleteMemberCredentialByIssuer(
    @GetUser() user: User,
    @Param('credentialId', ParseIntPipe) credentialId: number,
  ) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for Issuers.');
    }

    return this.credentialsService.removeMemberCredential(credentialId);
  }
}
