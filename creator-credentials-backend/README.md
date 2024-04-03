CREATOR_CREDENTIAL_BACKEND

## Installation

```bash
$ pnpm install
```

## Running the app in a docker image:
```
docker compose up # dev
# or
docker compose up -f docker-compose-prod.yml (prod)
```
## Running the app

```bash
# production run of local build
$ pnpm run start

# watch mode
$ pnpm run dev

# watch mode at docker compose
$ pnpm run dev:dock

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
