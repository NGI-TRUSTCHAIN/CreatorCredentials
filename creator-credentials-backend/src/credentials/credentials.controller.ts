import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateEmailCredentialDto } from './dto/create-credential.dto';
import { GetClerkUserAuth } from 'src/users/get-clerk-auth.decorator';
import { AuthObject } from '@clerk/clerk-sdk-node';
import { AuthGuard } from 'src/users/guards/clerk-user.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';

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

  // @Get(':id')
  // async getCredentialById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @GetClerkUserAuth() auth: AuthObject,
  // ) {
  //   return this.credentialsService.getById(id, auth.userId);
  // }

  @UseGuards(AuthGuard)
  @Get()
  async getAllCredentialsOfUser(@GetUser() user: User) {
    const credentials = await this.credentialsService.getAllCredentialsOfUser(
      user,
    );

    return {
      credentials,
    };
  }
  @UseGuards(AuthGuard)
  @Get('email')
  async getEmailCredentialOfUser(@GetUser() user: User) {
    const emailCredential =
      await this.credentialsService.getEmailCredentialOfUser(user);

    return {
      emailCredential,
    };
  }

  // @UseGuards(AuthGuard)
  // @Delete()
  // async removeEmailCredential(@GetUser() user: User) {
  //   return this.credentialsService.removeEmailCredential(user);
  // }
}
