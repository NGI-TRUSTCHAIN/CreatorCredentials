import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const clerkId = request.auth.userId;
    if (!clerkId) return false;

    const user = await this.usersService.getByClerkId(clerkId);
    request.user = user;
    // If you want to allow the request even if auth fails, always return true
    return !!user;
  }
}
