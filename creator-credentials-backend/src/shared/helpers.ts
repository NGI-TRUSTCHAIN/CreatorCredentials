import {
  toBuffer,
  hashPersonalMessage,
  fromRpcSig,
  ecrecover,
  publicToAddress,
  bufferToHex,
} from 'ethereumjs-util';

import { UnauthorizedException } from '@nestjs/common';
import { domainVerificationPrefix } from 'src/credentials/credentials.constants';

export function checkSignatureAndThrow(
  nonce: string,
  address: string,
  signedMessage: string,
  termsAndConditionsUrl: string,
) {
  const message = `Welcome to Creator Credentials app!\n\nClick to sign-in and accept the Terms of Service (${termsAndConditionsUrl}).\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour wallet address:\n${address}\n\nNonce:\n${nonce}`;

  // Check if signature is valid
  const msgBuffer = toBuffer(bufferToHex(Buffer.from(message)));
  const msgHash = hashPersonalMessage(msgBuffer);
  const signatureParams = fromRpcSig(signedMessage);
  const publicKey = ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s,
  );
  const addressBuffer = publicToAddress(publicKey);
  const addressHashed = bufferToHex(addressBuffer);
  // Check if address matches
  if (addressHashed.toLowerCase() !== address.toLowerCase()) {
    throw new UnauthorizedException();
  }
}

export const DEFAULT_RECORD_LENGTH = 126;

export function generateDomainRecord() {
  return `${domainVerificationPrefix}0x${generateAlfaNumericIdentifier(
    DEFAULT_RECORD_LENGTH,
  )}`;
}

export function generateAlfaNumericIdentifier(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function generateWellKnownForDidWeb(didWeb: string) {
  return {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/jws-2020/v1',
    ],
    id: `did:web:${didWeb}`,
    value: didWeb,
    verificationMethod: [
      {
        id: `did:web:${didWeb}#key-0`,
        type: 'JsonWebKey2020',
        controller: `did:web:${didWeb}`,
        publicKeyJwk: {
          kty: 'OKP',
          crv: 'Ed25519',
          x: generateAlfaNumericIdentifier(32),
        },
      },
    ],
    authentication: ['did:web:creatorcredentials.dev#key-0'],
  };
}
