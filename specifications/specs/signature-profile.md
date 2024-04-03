---
title: Signature Profile
date: 2024-04-03
version: 1.0
tags: signatures, profile
---

## Table of Contents <!-- omit in toc -->

- [Introduction](#introduction)
- [Private keys, public keys and x509 certificates](#private-keys-public-keys-and-x509-certificates)
- [Signature formats](#signature-formats)
- [Verifiable Credential signing](#verifiable-credential-signing)
- [Verifiable Presentation signing](#verifiable-presentation-signing)

## Introduction

CreatorCredentials builds on established signature profiles as defined in EBSI
and per eIDAS (JAdES). In this document we summarise how Verifiable Credentials are signed
and the Verifiable Credential and Verifiable Presentation signatures are verified.

## Private keys, public keys and x509 certificates

Private keys are secrets that are used to create signatures. Public keys are
derived deterministically from the private keys and are used to verify the
signatures. Certificates, are statements about the private key security policies
and may contain information about the subject controlling the private key. Most
common public key certificate format is x509 - PEM encoded.

## Signature formats

The application supports the following signature formats

- JWS: compact and JSON serialised
- Linked data proofs - JSON Web Signature 2020

## Verifiable Credential signing

VC issuers are identified using did:web. DIDs are used to identify the public
keys that validate the signature. Public key that verifies the signature must
also be included in the protected header under the "jwk" claim in the JWK
format. This enables to validate the signature even if the public key resolution
via did:web fails.

If the public key is accompanied with an x509 certificate, the x509 certificate
MUST be embedded in the protected header in the x5c claim, according to the JWS
RFC specifications.

## Verifiable Presentation signing

Verifiable Credentials are issued to natural persons' public keys or did:key.
did:key essentially contains an encoded public key. When users present the VC
and they need to prove that the VC belongs to them, they must create a
cryptographic proof and present it in the Verifiable Presentation format.

Since did:key already contains the public key that verifies the signature, "jwk"
header is not recommended.

Public key that validates the VP signature MUST belong to the credential subject
of the VC.

Optional: If user has an x509 certificate, it MUST be included in the x5c
protected header claim.
