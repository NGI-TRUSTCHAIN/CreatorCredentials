# Host Decentralised identifiers

This document summarises a did:web DID method profile of a host.

The Host MUST support did:web. did:web allows to publish information about host's public keys via the host website.

The host did:web is configured and set up in the configuration and deployment phase. Steps below summarise the creation of the did:web.

- From the host configuration determine the hostname and the location of the public keys
- Load the public keys and create a DID Document that contains all the public keys of the host
  - [Example DID Document](../examples/host.com/.well-known/did.json)
    - Verification method `JsonWebKey2020` MUST be used
    - The DID Document MUST contain at least one public key: in this version we'll use only one public key
    - The DID Document MAY contain authentication claim
    - The DID Document MUST contain assertionMethod
      - The DID Document MUST reference the host's public key that's used to sign Verification VCs
- The DID Document MUST be stored in a did.json file under: `host.com/.well-known/did.json`
  - Optional: HTTP response header content type should be: `application/did+ld+json`. Content type `application/json` is also conformant with the did:web specification
