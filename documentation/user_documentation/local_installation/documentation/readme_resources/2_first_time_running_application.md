1. Create and configure the environment variables in the `.env` file under /server like so:

<br>

![Example ENV File](<../../../../readme_resources/ENV_example.png>)

2. Make sure that DB_HOST equals "localhost".
3. Make sure DB_USER equal "root".
4. Make sure DB_PASSWORD equals the password you created when you installed MySQl Workbench. If you opted for no password, leave this an empty String.
5. Make sure DB_NAME equals the name of the Schema you created in MySQl Workbench. If you followed the tutorial, this will be "proof_buddy_development".
6. Make sure DB_DIALECT equals "mysql", which is the dialect the server will communicate with the database.
7. Make sure JWT_SECRET equals a secret key that you will not share on GitHub
8. JWT_EXPIRATION equals "86400"
9. EMAIL_USERNAME equals a email address that you wish to you. I strongly suggest creating a seperate email address, which is not linked to any other email you own for security.
10. EMAIL_PASSWORD equals the target email address you have provided.
11. Final note: Never push your .env file to Github or share it on any public forum. This will cause a security risk for yourself. Presently, the .gitignore is set up to ignore these files.

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

2. Start the backend server by opening a new terminal:

```bash
cd server
npm start
```
3. Start the frontend client by opening a new terminal:

```bash
cd client
npm start
```