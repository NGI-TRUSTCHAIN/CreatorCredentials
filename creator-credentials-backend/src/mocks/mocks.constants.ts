import { CreatorVerificationStatus } from 'src/shared/typings/CreatorVerificationStatus';
import {
  CreatorCredentials,
  VerifiedCredentialsUnion,
} from 'src/shared/typings/Credentials';
import { CredentialVerificationStatus } from 'src/shared/typings/CredentialVerificationStatus';
import { IssuerWithVerifiedCredentials } from 'src/shared/typings/Issuer';
import { CredentialType } from 'src/shared/typings/CredentialType';
import { IssuerConnectionStatus } from 'src/shared/typings/IssuerConnectionStatus';
import { Creator } from 'src/shared/typings/Creator';
import { GetIssuerCredentialsResponse } from './mocks.types';

const DEFAUTL_COMPANY_NAME = 'Liccium B.V.';
export const MOCK_ISSUER_CREDENTIALS_FOR_RESPONSE: GetIssuerCredentialsResponse =
  {
    credentials: {
      membership: [
        {
          id: 'issuer-member-credential-id-1',
          type: CredentialType.Member,
          status: CredentialVerificationStatus.Success,
          data: {
            requirements: 'Info about requirements',
            validity: '1 year',
          },
        },
      ],
      domain: {
        id: 'issuer-domain-credential-id-1',
        type: CredentialType.Domain,
        data: {
          domain: 'https://example.com',
        },
      },
      didWeb: {
        id: 'issuer-did-web-credential-id-1',
        type: CredentialType.DidWeb,
        data: {
          domain: 'https://example.com',
        },
      },
    },
  };

export const MOCK_CREATOR_CREDENTIALS: CreatorCredentials = {
  email: {
    id: 'email-credential-id',
    type: CredentialType.EMail,
    data: {
      address: 'testcreator@test.com',
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
    },
    status: CredentialVerificationStatus.Success,
  },
  metaMask: {
    id: 'metamask-credential-id',
    type: CredentialType.Wallet,
    data: {
      address: '0x171147d85c5t54badb920fc7gfs6822e0132470c',
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
    },
    status: CredentialVerificationStatus.Success,
  },
  domain: null,
  membership: [
    {
      id: 'membership-credential-id-1',
      type: CredentialType.Member,
      data: {
        companyName: DEFAUTL_COMPANY_NAME,
        requirements: 'Info about requirements',
      },
      status: CredentialVerificationStatus.Success,
    },
    {
      id: 'membership-credential-id-2',
      type: CredentialType.Member,
      data: {
        companyName: 'Posth Werk B.V.',
        requirements: 'Info about requirements',
      },
      status: CredentialVerificationStatus.Pending,
    },
  ],
};

export const ISSUER_PROFILE = {
  companyName: 'Liccium Ltd wrong test',
  description:
    'Liccium Trust Engine, supporting creators to make verifiable declarations of original content',
  domain: 'liccium.com',
  email: 'alan@liccium.com',
};

export const MOCK_ISSUER_CREDENTIALS: VerifiedCredentialsUnion[] = [
  {
    id: '1',
    type: CredentialType.EMail,
    data: {
      address: 'testcreator@test.com',
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
    },
    status: CredentialVerificationStatus.Success,
  },
  {
    id: '2',
    type: CredentialType.Wallet,
    data: {
      address: '0x171147d85c5t54badb920fc7gfs6822e0132470c',
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
    },
    status: CredentialVerificationStatus.Success,
  },
  {
    id: '3',
    type: CredentialType.Member,
    data: {
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
    },
    status: CredentialVerificationStatus.Success,
  },
];

export const MOCK_ISSUERS: IssuerWithVerifiedCredentials[] = [
  {
    id: '1',
    name: 'Liccium test B.V.',
    description:
      'Based in the Netherlands, supporting creators credentials worldwide',
    imageUrl: '/images/brand.svg',
    data: {
      domain: 'creatorcredentials.com',
      requirements: 'Info about requirements',
    },
    fees: true,
    status: IssuerConnectionStatus.Connected,
    vcs: MOCK_ISSUER_CREDENTIALS,
  },
  {
    id: '2',
    name: 'Posth Werk B.V.',
    description:
      'Based in the Netherlands, supporting creators in the music industry',
    imageUrl: '/images/posth-werk.svg',
    data: {
      domain: 'posth.me',
      requirements: 'Info about requirements',
    },
    fees: true,
    status: IssuerConnectionStatus.Connected,
    vcs: MOCK_ISSUER_CREDENTIALS,
  },
  {
    id: '3',
    name: 'Liccium B.V.',
    description: `Liccium helps creators to inseparably bind public and verifiable claims to their content.`,
    imageUrl: '/images/liccium.svg',
    data: {
      domain: 'liccium.com',
      requirements: 'Info about requirements',
    },
    fees: false,
    status: IssuerConnectionStatus.Pending,
    vcs: MOCK_ISSUER_CREDENTIALS,
  },
  {
    id: '4',
    name: 'Alternative Artists Association',
    description: `The AAA is supporting alternative artists worldwide`,
    imageUrl: '/images/icons/schedule.svg',
    data: {
      domain: 'aaa.com',
      requirements: 'Info about requirements',
    },
    fees: true,
    status: IssuerConnectionStatus.NotStarted,
    vcs: MOCK_ISSUER_CREDENTIALS,
  },
  {
    id: '5',
    name: 'News VerifiedCredential Service',
    description: `The NCS is a NGO, supporting news journalists and photographers worldwide`,
    imageUrl: '/images/icons/caption-filled.svg',
    data: {
      domain: 'NCS-credentials.com',
      requirements: 'Info about requirements',
    },
    fees: true,
    status: IssuerConnectionStatus.NotStarted,
    vcs: MOCK_ISSUER_CREDENTIALS,
  },
  {
    id: '6',
    name: 'Videographic Trust',
    description: `This trust service works with vloggers, film makers and documentarists `,
    imageUrl: '/images/icons/verified-filled.svg',
    data: {
      domain: 'trust.video',
      requirements: 'Info about requirements',
    },
    fees: true,
    status: IssuerConnectionStatus.NotStarted,
    vcs: MOCK_ISSUER_CREDENTIALS,
    additionalVerificationSteps: true,
  },
];

export const MOCK_CREATORS: Creator[] = [
  {
    id: 'mock-creator-1',
    title: 'Alan Doe',
    imageUrl: '/images/mock-creator-image.png',
    credentials: {
      email: 'alan.doe@creator.info',
      domain: 'alan.doe.creator.info',
      walletAddress: '0x171147d85c5t54badb920fc7gfs6822e0132470c',
    },
    status: CreatorVerificationStatus.Accepted,
  },
  {
    id: 'mock-creator-2',
    title: 'John Doe',
    imageUrl: '/images/mock-creator-image.png',
    credentials: {
      email: 'john.doe@creator.info',
      domain: 'john.doe.creator.info',
      walletAddress: '0x171147d85c5t54badb920fc7gfs6822e0132470c',
    },
    status: CreatorVerificationStatus.Accepted,
  },
  {
    id: 'mock-creator-3',
    title: 'Jane Doe',
    imageUrl: '/images/mock-creator-image.png',
    credentials: {
      email: 'jane.doe@creator.info',
      domain: 'jane.doe.creator.info',
      walletAddress: '0x171147d85c5t54badb920fc7gfs6822e0132470c',
    },
    status: CreatorVerificationStatus.Accepted,
  },
  {
    id: 'mock-creator-4',
    title: 'James Bond',
    imageUrl: '/images/mock-creator-image.png',
    credentials: {
      email: 'james.bond@creator.info',
      domain: 'james.bond.creator.info',
      walletAddress: '0x171147d85c5t54badb920fc7gfs6822e0132470c',
    },
    status: CreatorVerificationStatus.Accepted,
  },
  ...Array.from(Array(10).keys()).map((i) => ({
    id: `mock-creator-${i + 10}`,
    title: `Creator ${i + 5}`,
    imageUrl: '/images/mock-creator-image.png',
    credentials: {
      email: `creator${i + 5}.creator.info`,
      domain: `creator${i + 5}.creator.info`,
      walletAddress: '0x171147d85c5t54badb920fc7gfs6822e0132470c',
    },
    status: CreatorVerificationStatus.Pending,
  })),
];

export const DID_WEB_JSON_FILE = `// 20231028173813
// https://www.issuer.com/.well-known/did.json

{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/jws-2020/v1"
  ],
  "id": "did:web:issuer.com",
  "verificationMethod": [
    {
      "id": "did:web:issuer.com#key-0",
      "type": "JsonWebKey2020",
      "controller": "did:web:issuer.com",
      "publicKeyJwk": {
        "kty": "OKP",
        "crv": "Ed25519",
        "x": "fadshgsadhasdhryhdfhsdafhsdfhsdfh"
      }
    }
  ],
  "authentication": [
    "did:web:liccium.dev#key-0"
  ]
}`;
