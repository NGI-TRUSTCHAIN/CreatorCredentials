---
title: Issuer implementation guidelines - Bitstring Status List v1.0
date: 2024-04-01
version: 1.0
tags: revocation
---

W3C-compliant bitstring status list implementation guidelines for Liccium and CreatorCredentials.

This document conforms to W3C specifications [v20240330](https://www.w3.org/TR/2024/WD-vc-bitstring-status-list-20240330/)

## Table of Contents <!-- omit in toc -->

- [Overview](#overview)
- [Profile](#profile)
- [As an issuer, I provide status list endpoints](#as-an-issuer-i-provide-status-list-endpoints)
  - [Security considerations](#security-considerations)
- [As an issuer, I create an empty status list](#as-an-issuer-i-create-an-empty-status-list)
- [As an issuer, I issue a VC](#as-an-issuer-i-issue-a-vc)
- [As an issuer, I revoke a VC](#as-an-issuer-i-revoke-a-vc)
- [As a verifier, I verify a VC](#as-a-verifier-i-verify-a-vc)
- [Data models](#data-models)
  - [Credential Status object](#credential-status-object)
  - [Bitstring Status List VC](#bitstring-status-list-vc)

## Overview

In this document, we define the following processes for issuers and verifiers:

- Issuer provides status list endpoints
- Issuer initiates an empty status list VC
- Issuer issues a VC
- Issuer revokes a VC
- Verifier verifies a VC

## Profile

Verifiable Credentials can only be revoked.

- Credential status: Bitstring status list
- Status Purpose: revocation
- Number of entries: 131072
- Statuses:
  - 0: valid
  - 1: invalid (revoked)
- Securing: JWS (JSON serialised)
- Default validity time: 24h
- Securing resolutions:
  - allow-list
    - <https://creatorcredentials.dev>

## As an issuer, I provide status list endpoints

As an issuer I MUST serve the status VCs. For this, I need to expose an HTTP GET endpoint, as defined below:

```yaml
openapi: 3.0.3
info:
  title: Status List API
  description: API for accessing status lists
  version: 1.0.0
servers:
  - url: http://example.com
paths:
  /{issuer}/status-list/{status-list-id}:
    get:
      summary: Retrieve a specific status list
      description: |
        Retrieves the status list associated with the provided status list ID.
      parameters:
        - name: issuer
          in: path
          description: The name or unique id of the credential issuer
          required: true
          schema:
            type: string
        - name: status-list-id
          in: path
          description: The ID of the status list to retrieve
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful operation
          content:
            application/jose+json:
              schema:
                $ref: '#/components/schemas/JsonSerializedJWS'
        '404':
          description: Status list not found
        '500':
          description: Internal server error
components:
  schemas:
    JsonSerializedJWS:
      type: object
      properties:
        payload:
          description: Base64url-encoded payload data.
          type: string
        protected:
          description: Base64url-encoded JWS Protected Header.
          type: string
        signature:
          description: Base64url-encoded signature.
          type: string
      required: ["payload", "protected", "signature"]
```

The endpoint is public. The status list id MUST be a random string: base64url encoded random 20 bytes.

### Security considerations

The endpoint should implement rate-limiting since each successful query will serve 16 KB of data.

## As an issuer, I create an empty status list

Issuer may need to manage one or more status lists, depending on the number of issued VCs.

- Create a random status id
  - Create a random array of 20 bytes
  - Base64url encode the bytes
  - The resulting string is the status list id
- Init a bitstring
  - Create an empty bit array of length 131072
  - Populate it with 0s
  - For each value in bitstring, if there is a corresponding statusListIndex value in a credential in issuedCredentials, set the value to the appropriate status
  - Compress the bitstring by using the GZIP compression algorithm on the bitstring and then base64url-encode the result (with no padding)
- Create a Status VC
  - Create a status VC according to the [data model](#bitstring-status-list-vc)
- Sign the VC as defined in TBD. Signature format: Compact serialised JWS.
- Expose the status VC via the endpoint
- Re-issue/sign the VC after it expires: time > validUntil

## As an issuer, I issue a VC

- Create a VC
- Add the credentialStatus claim
- Assign the VC to a status list
- Create a random status index in the defined range [0, 131071]
- Check in the local database that the index is available
- Populate the credentialStatus object according to the [data model](#credential-status-object)

## As an issuer, I revoke a VC

- Fetch the status VC of the credential we want to revoke
- Get the index of the VC in the bitstring
- Set the value at the index to 1
- Re-issue the VC with the new bitstring value

## As a verifier, I verify a VC

**Verify VC Status:**

- Ensure the VC contains the "credentialStatus" claim.
- Confirm that the "credentialStatus" object includes all required claims as per the [data model](#credential-status-object).
- Validate the credentialStatus object:
  - Ensure the "type" is "BitstringStatusListEntry".
  - Verify that the "statusPurpose" is set to "revocation".
  - Decode and verify the "statusListIndex" value as an integer within the range [0, 131071].
  - Verify that the "statusListCredential" value is a URL with the "https" scheme.
  - Ensure the domain name of the statusListCredential is allow-listed (currently limited to "creatorcredentials.com").

**Retrieve the Status VC from the endpoint:**

- Confirm that the response content type is "application/jose+json".
- Validate that the response is a JSON encoded JWS according to the OpenAPI specifications.
- Verify the signature following TBD guidelines.
- Decode the payload.

**Validate the Status VC:**

- Confirm that the payload is a VC conforming to the [JSON schema](#bitstring-status-list-vc).
- Ensure the "validFrom" is less than or equal to the current time.
- Confirm that the "validUntil" is greater than the current time.
- Check that the issuer value meets the specified requirements.
- Validate the credentialSubject as follows:
  - Ensure the "type" is "BitstringStatusListCredential".
  - Confirm the "statusPurpose" is set to "revocation".
  - Decode the base64url encoded value of the "encodedList" claim.
  - Unzip (gzip) the result from the previous step.
  - Verify that the array size is 131072.
  - Check the value at the index specified in the VC.
  - If the value at the index is 0, the VC is valid; if it's 1, the VC is invalid (revoked).

## Data models

### Credential Status object

Every revocable VC MUST contain a credentialStatus object that conforms to the following JSON schema.

```json
{
  "$schema": "http://json-schema.org/draft/2020-12/schema#",
  "title": "BitstringStatusListEntry v1.0",
  "description": "Data model for enabling status information for a verifiable credential.",
  "type": "object",
  "properties": {
    "type": {
      "description": "The type property. Must be BitstringStatusListEntry.",
      "type": "string",
      "const": "BitstringStatusListEntry"
    },
    "statusPurpose": {
      "description": "The purpose of the status entry. Allowed values are 'revocation'.",
      "type": "string",
      "const": "revocation"
    },
    "statusListIndex": {
      "description": "Arbitrary size integer greater than or equal to 0, expressed as a string in base 10.",
      "type": "string",
      "pattern": "^[0-9]+$"
    },
    "statusListCredential": {
      "description": "URL to a verifiable credential with type property including 'BitstringStatusListCredential'.",
      "type": "string",
      "format": "uri"
    }
  },
  "required": ["type", "statusPurpose", "statusListIndex", "statusListCredential"],
  "additionalProperties": false
}
```

### Bitstring Status List VC

```json
{
  "$schema": "http://json-schema.org/draft/2020-12/schema#",
  "title": "BitstringStatusListCredential",
  "description": "Data model for a verifiable credential that contains a status list.",
  "type": "object",
  "properties": {
    "type": {
      "description": "The type property. Must include 'BitstringStatusListCredential'.",
      "type": "array",
      "items": {
        "type": "string",
        "const": "BitstringStatusListCredential"
      }
    },
    "validFrom": {
      "description": "The earliest point in time at which the status list is valid.",
      "type": "string",
      "format": "date-time"
    },
    "validUntil": {
      "description": "The latest point in time at which the status list is valid.",
      "type": "string",
      "format": "date-time"
    },
    "credentialSubject": {
      "description": "The subject of the credential.",
      "type": "object",
      "properties": {
        "type": {
          "description": "The type of the credential subject. Must be 'BitstringStatusList'.",
          "type": "string",
          "const": "BitstringStatusList"
        },
        "statusPurpose": {
          "description": "The purpose of the status entry. Must be one or more of 'revocation', 'suspension', or 'message'.",
          "type": "array",
          "items": {
            "type": "string",
            "enum": ["revocation", "suspension", "message"]
          }
        },
        "encodedList": {
          "description": "A Multibase-encoded base64url representation of the GZIP-compressed bitstring values for the associated range of verifiable credential status values.",
          "type": "string",
          "format": "byte"
        }
      },
      "required": ["type", "statusPurpose", "encodedList"],
      "additionalProperties": false
    }
  },
  "required": ["type", "validFrom", "validUntil", "credentialSubject"],
  "additionalProperties": false
}
```
