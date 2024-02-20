/* eslint-disable @typescript-eslint/no-unused-vars */

import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth';
import { BaseUserData } from './BaseUserData';
import { BackendTokens } from './BackendTokens';
import { SessionError } from './SessionError';

declare module 'next-auth' {
  interface User extends BaseUserData {}

  interface Session {
    user: BaseUserData;
    backendTokens: BackendTokens;
    error?: SessionError;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: BaseUserData;
    backendTokens: BackendTokens;
    error?: SessionError;
  }
}
