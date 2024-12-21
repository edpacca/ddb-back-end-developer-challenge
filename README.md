# DDB Back End Developer Challenge

Welcome to my submission for the [DDB backend developer coding assigment](https://github.com/DnDBeyond/back-end-developer-challenge). The task requirements have been condensed and restated as I have understood them. _<span style="color:orange;">Additional notes are shown in orange for clarity</span>_

This project is built on NodeJS using TypeScript, Express and MongoDB, following modern backend development best practices.

### Task Requirements

#### API

- [x] **Deal Damage to a player character**
  - support different types, consider defenses
  - Characters with resistance take half damage, while characters with immunity take no damage from a damage type.
- [x] **Heal**
  - increase character HP _<span style="color:orange;">assumed starting HP was max HP - cannot go above this_</span>
  - Temporary Hit Points take precedence over the regular HP pool and cannot be healed.
- [x] **Add Temporary Hit Points** - not additive, always taking the higher value, and cannot be healed.

#### Implementation

- [x] Build the API in ~~either C# or~~ NodeJS
- [x] Ensure that character information, including HP, is initialized during the start of the application.
- [x] Retrieve character information, including HP, from the `briv.json` file.
- [x] Data persists throughout App lifetime -<span style="color:orange;"> _DB is reset on startup_</span>
- [x] Use character filename as identifier - <span style="color:orange;">_using filename without ".json" extension as id_</span>

## Prerequisites

1. [Node.js](https://nodejs.org/en) (v20 recommended)
2. [npm](https://www.npmjs.com/) (comes with Node.js)
3. One of the following
   - [Docker](https://www.docker.com/) v ~=27
   - [MongoDB](https://www.mongodb.com/products/self-managed/community-edition) Community Edition for running a local instance (v ~=2.3.4 recommended)

## Scripts

| **Script** | **Command**               | **Description**                                 |
| ---------- | ------------------------- | ----------------------------------------------- |
| `build`    | `tsc`                     | Compiles the TypeScript files into JavaScript.  |
| `start`    | `npm run build && node .` | Builds the project and starts the application.  |
| `test`     | `jest`                    | Runs the test suite using Jest.                 |
| `lint`     | `eslint`                  | Lints the codebase for style and syntax issues. |

## Project Setup

```
git clone git@github.com:edpacca/ddb-back-end-developer-challenge.git
cd ddb-back-end-developer-challenge
```

**_IMPORTANT_**
create a file called `.env` in the top directory and add the following

```
MONGO_LOCAL_URI=mongodb://127.0.0.1:27017
MONGO_DOCKER_URI=mongodb://mongo:27017
DB_NAME=characters
DEBUG=true
```

preconfigured params that you may change are:

```
NODE_ENV="development"
PORT="3000",
```

## Run with Docker (recommended method)

Navigate to the root directory and run:

```
docker compose up -d
```

NB // older versions of docker do not support the `compose` command. If this doesn't work then consider upgrading or [installing docker-compose](https://docs.docker.com/compose/install/) and running:

```
docker-compose up -d
```

then query the API on `http://localhost:3000` (or whichver port was specified)

## Run locally without Docker (requires a local instance of MongoDB)

#### 1. Install MongoDB Community Edition

Community edition is free and does not (typically) require any preconfiguration after installing to work.

- [Linux installation](https://www.mongodb.com/docs/manual/administration/install-on-linux/)

- [Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

  - if you install as service mongo may be running in the background after installation

- [MacOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

  - if you install as service mongo may be running in the background after installation
  - NB // I have never used MongoDB on a mac - hopefully there are no gotchas

#### 1. Install Node packages

navigate to the root directory of the project

```
npm install
```

#### 3. Create directory called `db/` in the root of the project

this keeps a separate MongoDb database and avoids potential issues with system

```
mkdir db
```

#### 4. Run MongoDb Community Edition

in a new terminal, navigate to the root directory of the project where you created db/ and run

##### [Linux](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#start-mongodb)

```
mongod --dbpath ./db
```

##### [Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition-from-the-command-interpreter)

check if mongo is not running already as a service
Run `mongod.exe` - if located in the standard installation location

```
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="{PATH TO PROJECT DIR}\db"
```

##### [MacOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition)

Check mongo is not running already as a service
in root directory of project

```
mongod --dbpath ./db
```

#### 5. Run the application

in the top directory of the project simply run

```
npm run start
```

which will build and run the application from the `dist/` dir.

### Usage

Query the API on `http://localhost:3000` (or whichver port was specified
the port specified in the environment variables (default 3000).

Preconfigured postman files are provided in

### Endpoint.s

## `POST` `/characters/{id}/damage`

Apply damage to character via id.

### request body

```

{
"damageType": string,
"damageAmount": integer
}

```

## `POST` `/characters/{id}/heal`

Apply healing to character via id.

### request body

```

{
"healAmount": integer
}

```

## `POST` `/characters/{id}/temphp`

Add temp HP to character via id.

### request body

```

{
"tempHitPoints": integer
}

```

## `POST` `/characters/`

Create new character in DB. See [Character](https://github.com/edpacca/ddb-back-end-developer-challenge/blob/main/src/models/interfaces/character.ts) interface

### request body

```

{
  Character
}

```

## `GET` `/characters/{id}`

Retrieve a character via id

## `PUT` `/characters/{id}`

Edit a character via id. Updates only provided data See [Character](https://github.com/edpacca/ddb-back-end-developer-challenge/blob/main/src/models/interfaces/character.ts) interface

```

{
  Partial<Character>
}

```

## `DELETE` `/characters/{id}`

Delete a character via id.

```

```
