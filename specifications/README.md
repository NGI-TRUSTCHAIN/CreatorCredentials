# CreatorCredentials <!-- omit in toc -->

Creator Credentials software application that can be used by media organisations, membership organisations or other trust services to issue verifiable credentials to creators and other rightsholders.

## Table of Content

- [Table of Content](#table-of-content)
- [Getting started](#getting-started)
  - [Build](#build)
  - [Configure](#configure)
  - [Deploy](#deploy)
- [Profile](#profile)
- [Technical Specifications](#technical-specifications)
  - [Host](#host)
  - [Issuer](#issuer)
  - [Creator](#creator)
  - [Data models and schemas](#data-models-and-schemas)
  - [Advanced topics](#advanced-topics)
- [Reference](#reference)

## Getting started

### Build

_In this section, we summarise how to build the CreatorCredentials app._

### Configure

_In this section, we summarise how to configure the CreatorCredentials app._ 

### Deploy

_In this section, we summarise how to deploy the CreatorCredentials app._

## Profile

The Creator Credentials (CC) Verifiable Credentials (VC) profile follows the [EBSI](https://ebsi.eu) specifications. Details of the profile are defined [here](specs/profile.md).

## Technical Specifications

### Host

- How to set up and configure the CC app: [specs/host-setup-config.md](specs/host-setup-config.md)
- How to configure host's DID (did:web): [specs/host-did.md](specs/host-did.md)
- How to authenticate the issuers: [specs/host-issuer-authentication.md](specs/host-issuer-authentication.md)

### Issuer

- How to configure and verify issuer's did:web [specs/issuer-did.md](specs/issuer-did.md)

### Creator

- Creator email Verification: [specs/creator-email-verification.md](specs/creator-email-verification.md)

### Data models and schemas

- JSON Schema and examples of Verification VCs: [json-schema/verification-credentials/](json-schema/verification-credentials/)

### Advanced topics

- Creator logs in using its Creator Credentials: [specs/advanced/log-in-with-cc.md](specs/advanced/log-in-with-cc.md)

## Reference

- Creating a did:web (did:web Method Specification): https://w3c-ccg.github.io/did-method-web/#create-register
<!-- This was mentioned - <https://w3c-ccg.github.io/did-method-web/#example-creating-the-did-with-optional-path> -->
- AWS Key Management Service: <https://aws.amazon.com/kms/>
- JSON Web Tokens: <https://jwt.io/>
