import * as jose from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { CreateMemberCredentialDto } from './dto/create-member-credential.dto';

const credentialsHost = 'liccium.com';

export async function generateMemberCredentialObjectAndJWS(
  createMemberCredentialDto: CreateMemberCredentialDto,
) {
  const ecPrivateKey = await jose.importJWK(
    {
      kty: 'EC',
      crv: 'P-256',
      d: process.env.SIGNATURE_KEY_D,
      x: process.env.SIGNATURE_KEY_X,
      y: process.env.SIGNATURE_KEY_Y,
    },
    'ES256',
  );
  const now = new Date();
  const end = new Date();
  end.setFullYear(end.getFullYear() + 1);

  const credentialObject = {
    '@context': ['https://www.w3.org/ns/credentials/v2'],
    id: `urn:uuid:${uuidv4()}`,
    type: ['VerifiableCredential', 'VerifiableAttestation', 'VerifiableMember'],
    issuer: `did:web:${credentialsHost}`,
    validFrom: now.toISOString(),
    validUntil: end.toISOString(),
    credentialSubject: {
      id: `did:key:${createMemberCredentialDto.value}`,
      value: createMemberCredentialDto.value,
    },
    credentialSchema: [
      {
        id: 'https://github.com/CreatorCredentials/specifications/blob/main/json-schema/verification-credentials/member/schema.json',
        type: 'JsonSchema',
      },
    ],
    termsOfUse: {
      type: 'PresentationPolicy',
      confidentialityLevel: 'restricted',
      pii: 'sensitive',
    },
  };

  const jws = await new jose.CompactSign(
    new TextEncoder().encode(JSON.stringify(credentialObject)),
  )
    .setProtectedHeader({ alg: 'ES256' })
    .sign(ecPrivateKey);

  return { credentialObject, jws };
}
