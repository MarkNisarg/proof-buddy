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

Please view this link for a tutorial on MySQL Workbench: https://www.w3resource.com/mysql/administration-tools/mysql-workbench-tutorial.php
[MySQL Workbench Tutorial](https://www.w3resource.com/mysql/administration-tools/mysql-workbench-tutorial.php)

1. Download the MySQL installer from [here](https://dev.mysql.com/downloads/installer/).
2. Run the installer and follow the setup process.
3. After installation, start the MySQL server.
4. Create a database (schema) for the application and make a note of the credentials.

<br>

5. Click the local Instance MySQL80 to open the your local instance.

![Click the local Instance MySQL80 to open the your local instance.](<../../../../readme_resources/MySql Client.png>)



<br>

6. Click the Schema's tab on the lower left side of the Local instance "navigator" window.

<br>

![Click the Schema's tab on the lower left side of the Local instance "navigator" window.](<../../../../readme_resources/Schema_Tab-1.png>)

7. Right click the white space of the Schema Window, and select "Create Schema".

<br>

![Right click the white space of the Schema Window, and select "Create Schema".](<../../../../readme_resources/Create_Schema.png>)

8. Type in the your Schema name in the new window. Name it something easy to remember, and press apply. Note: it is a good idea to name this Schema "proof_buddy_development".

<br>

![Type in the your Schema name in the new window. Name it something easy to remember, and press apply. **Note** it is a good idea to name this Schema "proof_buddy_development".](<../../../../readme_resources/Create_Schema_1.png>)

9. You can confirm your Schema was created, by looking under the Navigator Tab of Schemas, you should see your named Schema.

Note: Do not edit your schema such as adding tables or rows to tables. When you run the server for the first time, it will sync and populate your schema automatically.

<br>

![You can confirm your Schema was created, by looking under the Navigator Tab of Schemas, you should see your named Schema.](<../../../../readme_resources/Create_Schema_2.png>)

10. Congratulations! You have succesfully created a Schema to for your database. Make note of any password you may have used, and the name of your Schema.
    

*Note: It's recommended to use a client tool like MySQL Workbench for easier database management.*

**OR**

For more information follow [W3 Schools](https://www.w3schools.com/mysql/mysql_install_windows.asp) to install MySQL.

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

5. Install the required dependencies for the client:

```bash
cd ..
cd client
npm install
```