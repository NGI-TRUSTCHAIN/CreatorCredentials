import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  VERSION_NEUTRAL,
  Param,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateDidWebJsonFileResponse,
  CreateTxtRecordForDomainResponse,
  GenerateMetaMaskNonceResponse,
  GetCreatorCredentialsResponse,
  GetCreatorIssuersResponse,
  GetCredentialsRequestDetailsResponse,
  GetIssuerCreatorsResponse,
  GetIssuerCredentialsResponse,
  GetIssuerDetailsWithCredentialsResponse,
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
  DID_WEB_JSON_FILE,
} from './mocks.constants';
import { CreatorVerificationStatus } from 'src/shared/typings/CreatorVerificationStatus';
import { VerifiedCredentialsUnion } from 'src/shared/typings/Credentials';

// @Controller('mocks')
@Controller('mocks')
export class MocksController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'test mock string';
  }

  @Get('/issuer/creators')
  getIssuerCreators(
    @Query('status') status: string = CreatorVerificationStatus.Accepted,
    @Query('search') search: string = '',
  ): GetIssuerCreatorsResponse {
    console.log('GetIssuerCreatorsResponse status', status);
    console.log('GetIssuerCreatorsResponse search', search);
    const filteredCreators = MOCK_CREATORS.filter(
      (creator) => creator.status === status && creator.title.includes(search),
    );
    return { creators: filteredCreators };
  }

  @Get('/issuer/creators/:creatorId')
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

  @Post('issuer/creators/accept')
  @HttpCode(HttpStatus.CREATED)
  acceptCreatorConnection() {}

  @Post('issuer/creators/reject')
  @HttpCode(HttpStatus.CREATED)
  rejectCreatorConnection() {}

  @Get('creator/issuers')
  getCreatorIssuers(): GetCreatorIssuersResponse {
    return {
      issuers: MOCK_ISSUERS,
    };
  }

  @Get('creator/issuers/:issuerId')
  getCreatorIssuerById(
    @Param('issuerId') issuerId: string,
  ): GetIssuerDetailsWithCredentialsResponse {
    const issuerData = MOCK_ISSUERS.find((issuer) => issuer.id === issuerId);

    if (!issuerData) {
      throw new NotFoundException();
    }

    return {
      issuer: issuerData,
    };
  }

  @Post('creator/issuers/:issuerId/confirm-request')
  @HttpCode(HttpStatus.CREATED)
  confirmCreatorToIssuerConnection(@Param('issuerId') issuerId: string) {}

  @Get('issuer/profile')
  getIssuerProfile(): GetIssuerProfileResponse {
    return ISSUER_PROFILE;
  }

  @Get('users/credentials')
  getCreatorCredentials(): GetCreatorCredentialsResponse {
    return MOCK_CREATOR_CREDENTIALS;
  }

  @Post('users/nonce')
  generateMetaMaskNonce(): GenerateMetaMaskNonceResponse {
    const randomNonce = Math.floor(Math.random() * 1000000000);
    return { nonce: randomNonce.toString() };
  }

  @Post('users/:walletAddress')
  generateMetaMaskNonceByAddress(
    @Param('walletAddress') walletAddress: string,
  ): GenerateMetaMaskNonceResponse {
    const randomNonce = Math.floor(Math.random() * 1000000000);
    return { nonce: randomNonce.toString() };
  }

  @Post('verification/domain/txt-record')
  @HttpCode(HttpStatus.CREATED)
  createTxtRecordForDomain(): CreateTxtRecordForDomainResponse {
    return {
      txtRecord:
        '"cc-verification=0x3220916bf809914j82924bb8f32e1c396eba5c5 0b199a8ea7e37g6s99bcf141f1de226 4ded52ef3c0fb6cb79bd37j8237596b692dc37176ea78dc5c385fb1c"',
    };
  }

  @Post('verification/domain/confirm')
  @HttpCode(HttpStatus.CREATED)
  confirmDomainTxtRecord() {}

  @Post('verification/did-web/create-file')
  @HttpCode(HttpStatus.CREATED)
  createDidWebJsonFile(): CreateDidWebJsonFileResponse {
    return {
      jsonFileContent: DID_WEB_JSON_FILE,
    };
  }

  @Post('verification/did-web/confirm-upload')
  @HttpCode(HttpStatus.CREATED)
  confirmDidWebJsonFileUpload() {}

  @Get('creator/credentials/issuers')
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

  @Get('issuer/credentials')
  getIssuerCredentials(): GetIssuerCredentialsResponse {
    return MOCK_ISSUER_CREDENTIALS_FOR_RESPONSE;
  }

  @Post('creator/credentials/request')
  @HttpCode(HttpStatus.CREATED)
  sendCredentialsRequest() {}
}
