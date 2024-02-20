#!/bin/bash

private_key_file="private_key.pem"
public_key_file="public_key.pem"

# Generate a private key (unencrypted)
openssl ecparam -name prime256v1 -genkey -noout -out "$private_key_file"

# Derive the public key from the private key
openssl ec -in "$private_key_file" -pubout -out "$public_key_file"

# Set restrictive permissions on the private key file
chmod 600 "$private_key_file"

# Set the owner of the private key file to the current user
chown $USER "$private_key_file"

echo "secp256r1 key pair generated and stored in $private_key_file and $public_key_file"
openssl ec -pubin -in $public_key_file -text -noout
