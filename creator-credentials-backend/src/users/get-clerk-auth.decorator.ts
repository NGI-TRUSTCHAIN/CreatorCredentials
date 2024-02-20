import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type AuthObject } from '@clerk/clerk-sdk-node';

export const GetClerkUserAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthObject => {
    const request = ctx.switchToHttp().getRequest();
    return request.auth;
  },
);
