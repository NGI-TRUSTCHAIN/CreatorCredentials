import { Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetClerkUserAuth } from './get-clerk-auth.decorator';
import { type AuthObject, clerkClient } from '@clerk/clerk-sdk-node';
import { ClerkRole } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Get(':clerkId')
  async getUserById(@Param('clerkId') clerkId: string) {
    return this.usersService.getByClerkId(clerkId);
  }
}
