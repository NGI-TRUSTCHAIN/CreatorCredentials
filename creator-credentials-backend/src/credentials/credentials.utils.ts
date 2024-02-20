import { Credential } from './credential.entity';

export function formatCredential(credential: Credential) {
  return {
    ...credential.credentialObject,
    proof: {
      type: 'JwtProof2020',
      jwt: credential.token,
    },
  };
}
