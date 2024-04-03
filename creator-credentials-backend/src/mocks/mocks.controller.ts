import {
  Controller,
  Get,
  Param,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  GetCreatorCredentialsResponse,
  GetCredentialsRequestDetailsResponse,
  GetIssuerCredentialsResponse,
  GetIssuerProfileResponse,
  GetIssuersBySelectedCredentialsResponse,
  GetRequestableCredentialsResponse,
} from './mocks.types';
import {
  MOCK_CREATORS,
  MOCK_ISSUER_CREDENTIALS,
  MOCK_ISSUERS,
  ISSUER_PROFILE,
  MOCK_CREATOR_CREDENTIALS,
  MOCK_ISSUER_CREDENTIALS_FOR_RESPONSE,
} from './mocks.constants';
import { VerifiedCredentialsUnion } from 'src/shared/typings/Credentials';

// @Controller('mocks')
@Controller('mocks')
export class MocksController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'test mock string';
  }

  // @Get('/issuer/creators/:creatorId')
  getIssuerCreatorById(
    @Param('creatorId') creatorId: string,
  ): GetCredentialsRequestDetailsResponse {
    const creator = MOCK_CREATORS.find((creator) => creator.id === creatorId);
    const credentials = MOCK_ISSUER_CREDENTIALS;

    if (!creator) {
      throw new NotFoundException();
    }

    return {
      creator,
      credentials,
    };
  }

  @Get('issuer/profile')
  getIssuerProfile(): GetIssuerProfileResponse {
    return ISSUER_PROFILE;
  }

  // @Get('users/credentials')
  getCreatorCredentials(): GetCreatorCredentialsResponse {
    return MOCK_CREATOR_CREDENTIALS;
  }

  // @Get('creator/credentials/issuers')
  getIssuersBySelectedCredentials(): GetIssuersBySelectedCredentialsResponse {
    const issuerData = [MOCK_ISSUERS[0], MOCK_ISSUERS[3]];

    if (!issuerData) {
      throw new NotFoundException();
    }

    return {
      issuers: issuerData,
    };
  }

  @Get('creator/credentials')
  getRequestableCredentials(): GetRequestableCredentialsResponse {
    const issuerData = [MOCK_ISSUERS[0], MOCK_ISSUERS[3]];

    if (!issuerData) {
      throw new NotFoundException();
    }

    return {
      credentials: MOCK_ISSUER_CREDENTIALS.map(
        (credential) =>
          ({
            id: credential.id,
            type: credential.type,
            data: {
              ...('companyName' in credential.data
                ? { companyName: credential.data.companyName }
                : {}),
            },
          }) as VerifiedCredentialsUnion,
      ),
    };
  }

  // @Get('issuer/credentials')
  getIssuerCredentials(): GetIssuerCredentialsResponse {
    return MOCK_ISSUER_CREDENTIALS_FOR_RESPONSE;
  }

  // @Post('creator/credentials/request')
  @HttpCode(HttpStatus.CREATED)
  sendCredentialsRequest() {}
}
