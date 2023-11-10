# Proof Buddy
A web application for verifying mathematical proofs using Truth-Functional Logic (TFL) and First Order Logic (FOL), currently utilized by professors and students in courses at Drexel University.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting up the Project](#setting-up-the-project)
- [Running the Application](#running-the-application)
- [API Reference](#api-reference)

## Prerequisites

Before starting with the installation process, ensure you have the following installed:

- [Node.js and npm](https://nodejs.org/en/download/)
- [MySQL](https://dev.mysql.com/downloads/installer/)

## Installation

### Node.js and npm

If you haven't installed Node.js and npm, follow these steps:

1. Go to [Node.js official website](https://nodejs.org/en/download/).
2. Choose the appropriate version (v18.18.2) for your OS and download it.
3. Run the installer and follow the installation process.

**OR**

Alternatively, install multiple Node.js using NVM [NodeWithNVM](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)

To verify the installation, open your terminal and run:

```bash
node -v
npm -v
```

### MySQL

1. Download the MySQL installer from [here](https://dev.mysql.com/downloads/installer/).
2. Run the installer and follow the setup process.
3. After installation, start the MySQL server.
4. Create a database (schema) for the application and make a note of the credentials. You'll need them to set up the backend connection.

*Note: It's recommended to use a client tool like MySQL Workbench for easier database management.*

**OR**

For more information follow [this](https://www.w3schools.com/mysql/mysql_install_windows.asp) to install MySQL.

## Setting up the Project

1. Clone the repository:

```bash
git clone https://github.com/MarkNisarg/proof-buddy.git
```

2. Navigate to the project directory:

```bash
cd proof-buddy
```

3. Checkout to develop branch:

```bash
git checkout develop
```

4. Install the required dependencies for the server:

```bash
cd server
npm install
```

## Running the Application

1. Before starting the server, configure the environment variables in the `.env` file. Please find sample `.env` below.

```
# Database configurations.
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=""
DB_NAME=proof_buddy_development
DB_DIALECT=mysql

# JSON web token configurations.
JWT_SECRET=yoursecretkey
JWT_EXPIRATION=86400

# Email configurations.
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
```

2. Start the backend server:

```bash
npm start
```

## API Reference

A list of the User API endpoints and their functions.

### `/api/v1/auth/signup`

* `POST` : Register a new user.

### `/api/v1/auth/signin`

* `POST` : Sign in an existing user.

### `/api/v1/auth/profile`

* `GET` : Get profile of the logged-in user (authentication required).

### `/api/v1/auth/verify-email`

* `GET` : Verify user email (query parameter: `token`).
