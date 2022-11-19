## Node JS CRM Backend Project

This is a NodeJS powered Web Application, Backend and API Resource hub for it's client interface.

## Installation

**Prepare a location for the project.** We will name the directory `crm`. Inside the project directory, set up git and pull from the repository. Or alternatively, download the project to the location.

```bash
git init
git pull https://github.com/samiksengupta/nodejs-crm.git
```

OR

```bash
git clone https://github.com/samiksengupta/nodejs-crm.git .
```
**Install dependencies.** This may take a while.

```bash
npm install
```

**Create a `.env` file** at the project root and copy contents from here into it.

```
HOST=localhost
PORT=3000
NODE_ENV=development

APP_NAME=crm

DEV_DB_HOSTNAME=localhost
DEV_DB_NAME=db_node_crm
DEV_DB_USERNAME=
DEV_DB_PASSWORD=

TEST_DB_HOSTNAME=localhost
TEST_DB_NAME=db_node_crm
TEST_DB_USERNAME=
TEST_DB_PASSWORD=

PROD_DB_HOSTNAME=localhost
PROD_DB_NAME=db_node_crm
PROD_DB_USERNAME=
PROD_DB_PASSWORD=

JWT_SECRET=<YOUR JWT SECRET HERE>
JWT_LIFESPAN=600
```
**Generating a secure JWT Secret**

In the console run the following commands:
```bash
node
require('crypto').randomBytes(64).toString('hex')
```
Copy the cryptographically secure JWT secret and use it as your JWT_SECRET

When you have set up your database configuration, the following scripts can be used to quickly setup the server.

**Run server using nodemon**

```bash
npm run server
```

### Todo

* ~~Create Login and Registration system~~
* ~~Create Authentication and Authorization system~~
* ~~Create Crud Operations with validations~~
* Unit tests
