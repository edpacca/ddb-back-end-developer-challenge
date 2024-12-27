# DDB Back-End Developer Challenge

Welcome to my submission for the [DDB backend developer coding assignment](https://github.com/DnDBeyond/back-end-developer-challenge). The task requirements have been condensed and restated as I have understood them.

This project is built on **Node.js** using **TypeScript**, **Express**, and **MongoDB**, following modern backend development best practices.

---

## Task Requirements

### API

- **Deal Damage to a Player Character**
  - Support different damage types, considering defenses.
  - Characters with resistance take half damage; characters with immunity take no damage.
- **Heal**
  - Increases character HP (assumed max HP as the limit).
  - Temporary hit points take precedence and cannot be healed.
- **Add Temporary Hit Points**
  - Not additive; always takes the higher value.

### Implementation

- Build the API in ~~C#~~ or **Node.js**.
- Initialize character information, including HP, at application start.
- Retrieve character information from the `briv.json` file.
- Persist data throughout the app's lifetime (_reset on startup_).
- Use the character filename (without `.json` extension) as the identifier.

---

## Prerequisites

1. [Node.js](https://nodejs.org/) (v18+ recommended)
2. [npm](https://www.npmjs.com/) (comes with Node.js)
3. MongoDB\*:
   - [Docker](https://www.docker.com/) v27 (recommended)
   - [MongoDB Community Edition](https://www.mongodb.com/products/community) for a local instance (v7 recommended).

\* _OPTIONAL_ - if MongoDB is not available see [Feature branch - Running Locally Without MongoDB](#running-locally-without-mongodb)

---

## Scripts

| **Script** | **Command**               | **Description**                                 |
| ---------- | ------------------------- | ----------------------------------------------- |
| `build`    | `tsc`                     | Compiles the TypeScript files into JavaScript.  |
| `start`    | `npm run build && node .` | Builds the project and starts the application.  |
| `test`     | `jest`                    | Runs the test suite using Jest.                 |
| `lint`     | `eslint`                  | Lints the codebase for style and syntax issues. |

---

## Structure

```
├── src/
│   ├── controllers/     # Business logic
│   ├── models/          # Data models and Schema definitions
│   ├── routes/          # Character router
│   ├── middleware/      # Request validation
│   ├── utils/           # Generic helper functions
│   ├── data/            # Raw JSON data
│   ├── db/              # Database setup files
├── tests/
```

---

## Project Setup

### Clone the Repository

```bash
git clone git@github.com:edpacca/ddb-back-end-developer-challenge.git
cd ddb-back-end-developer-challenge
```

### Configure Environment Variables

Create a `.env` file in the project root with the following:

```env
MONGO_LOCAL_URI=mongodb://127.0.0.1:27017
MONGO_DOCKER_URI=mongodb://mongo:27017
DB_NAME=characters
DEBUG=true

NODE_ENV=development
PORT=3000
```

---

## Running the Application

### Using Docker (Recommended)

1. Navigate to the project root.
2. Start the containers:
   ```bash
   docker compose up -d
   ```
3. Access the API at `http://localhost:3000` (or the port specified).

#### Older Docker Versions

If `docker compose` isn't available, use:

```bash
docker-compose up -d
```

---

### Running Locally (Without Docker)

#### 1. Install MongoDB Community Edition

Follow the instructions for your operating system:

- [Linux Installation](https://www.mongodb.com/docs/manual/administration/install-on-linux/)
- [Windows Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
- [MacOS Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

#### 2. Install Node.js Packages

Run the following in the project root:

```bash
npm install
```

#### 3. Create a `db/` Directory

Create a directory to store the MongoDB database:

```bash
mkdir db
```

#### 4. Start MongoDB

Start MongoDB with the `db/` directory:

- **Linux/MacOS**:
  ```bash
  mongod --dbpath ./db
  ```
- **Windows**:
  ```bash
  "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="{PATH TO PROJECT DIR}\db"
  ```

#### 5. Run the Application

Start the application:

```bash
npm run start
```

Access the API at `http://localhost:3000`.

---

### Running Locally Without MongoDB

_If neither Docker nor MongoDb are available_.
ensure the `NODE_ENV` environment variable is set to development.

```env
NODE_ENV=development
```

Run all commands from the project root:

#### 1. check out the feature branch `db-config`

```bash
git fetch
git checkout db-config
```

#### 2. Install Node.js Packages

```bash
npm install
```

#### 3. Run the Application

Start the application:

```bash
npm run start
```

You should see the log message "Using in memory storage".

Access the API at `http://localhost:3000`.

---

## API Endpoints

### `POST /characters/{id}/damage`

- Apply damage to a character.
- **Request Body**:
  ```json
  {
    "damageType": "string",
    "damageAmount": "integer"
  }
  ```

---

### `POST /characters/{id}/heal`

- Apply healing to a character.
- **Request Body**:
  ```json
  {
    "healAmount": "integer"
  }
  ```

---

### `POST /characters/{id}/temphp`

- Add temporary HP to a character.
- **Request Body**:
  ```json
  {
    "tempHitPoints": "integer"
  }
  ```

---

### `POST /characters/`

- Create a new character in the database.
- **Request Body**:
  See the [Character Interface](https://github.com/edpacca/ddb-back-end-developer-challenge/blob/main/src/models/interfaces/character.ts).

---

### `GET /characters/{id}`

- Retrieve a character by ID.

---

### `PUT /characters/{id}`

- Update a character's information.
- **Request Body**:
  ```json
  {
    "Partial<Character>"
  }
  ```

---

### `DELETE /characters/{id}`

- Delete a character by ID.

---

## Notes

- Preconfigured Postman collections are provided for testing.
- Ensure MongoDB is running when using the application locally.
