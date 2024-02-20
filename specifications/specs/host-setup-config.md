# Setup and configuration

- [Setup and configuration](#setup-and-configuration)
  - [Overview](#overview)
  - [Host](#host)
  - [Initialisation](#initialisation)
  - [Host private-public key generation and storage](#host-private-public-key-generation-and-storage)

## Roles

For the Creator Credentials application (CC app) we identify three roles: 

1) Host,
2) Issuer
3) Creator

Re/ 1) The **Host** is the entity that hosts the application:  

  - Signs/issues Verification VCs to Issuers and Creators
  - Owns host.com (for creatorcredential.dev replace host.com with creatorcredentials.dev)
  - Has did:web hosted at: host.com/.well-known/did.json
    - The did:web document contains information about all of the Host's public keys: which can be a simple JWK key pair, or a Q-Cert

Re/ 2) The **Issuer** is the entity that uses the Issuer Portal:  

  - Requests/receives VCs from the Host
  - Controls the web domain: issuer.com
  - Signs/Issues VCs to Creators
  - Has the did:web document hosted at: issuer.com/.well-known/did.json
    - The did:web document contains information about all of the Host public keys: which can be a simple JWK key pair, or a Q-Cert

    - A DNS TXT record/Domain Verification is NOT required

Re/ 3) The **Creator** is the entity that uses the Creator Hub:  

  - Requests/Receives VCs from the Host
  - Requests/Receives VCs from Issuers
  - Has a did:key (did:ethr/...)

## Host

The Host must be support the following capabilities:

- [Issuer Authentication](./host-issuer-authentication.md) with organisational email
- Perform Issuer Verification
  - did:web
- Issue Verification VC to Issuers

### Initialisation

The Host MUST:

- have private-public key pair to sign and issue Verification VCs

Host did:web is set up automatically with the service.

Before deploying the solution, the host must configure:

- hostname (host.com)
- key storage location
- database location
- other (to be updated)

### Host private-public key generation and storage

The host application must generate an EC secp256r1 (alternative names: P-256, prime256v1) key pair. Any [library](https://jwt.io/libraries) supporting ES256 signature should be capable of generating such a key pair. The key pair must be accessible to the host application for the purpose of issuing Verification VCs.

The private key can be stored

- plaintext local file with limited access rights
- ENV variable
- secure keystore (AWS/Google/Azure/...)

- encrypted local file with limited access rights
  - not recommended at this stage of the project as restarting the service requires manual intervention

Suggestion: begin with plaintext local file with limited access rights or .env/ENV

Example using OpenSSL: see the [examples/gen-unencrypted.sh](./examples/gen-unencrypted.sh)
