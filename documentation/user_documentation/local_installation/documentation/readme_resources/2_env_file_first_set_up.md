1. Create and configure the environment variables in the `.env` file under /server like so:

<br>

2. Make sure that DB_HOST equals "localhost".
3. Make sure DB_USER equal "root".
4. Make sure DB_PASSWORD equals the password you created when you installed MySQl Workbench. If you opted for no password, leave this an empty String.
5. Make sure DB_NAME equals the name of the Schema you created in MySQl Workbench. If you followed the tutorial, this will be "proof_buddy_development".
6. Make sure DB_DIALECT equals "mysql", which is the dialect the server will communicate with the database.
7. Make sure JWT_SECRET equals a secret key that you will not share on GitHub
8. JWT_EXPIRATION equals "86400"
9. GMAIL_USERNAME equals to the current proof buddy email: (see stakeholders for the current ProofBuddy E-Mail)
10. GMAIL_CLIENT_ID equals: (your generated Client ID OR the current Client ID from the stakeholders)
11. GMAIL_CLIENT_SECRET equals: (your generated Client Secret Key OR the current Client Secret Key from the stakeholders)
12. GMAIL_REFRESH_TOKEN equals: (your generated refresh token OR the most current Refresh Token from the stakeholders)
11. Final note: Never push your .env file to Github or share it on any public forum. This will cause a security risk for yourself. Presently, the .gitignore is set up to ignore these files.

```
# Database configurations.
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="Your_Password_Here"
DB_NAME=your_schema_name_here
DB_DIALECT=mysql

# JSON web token configurations.
JWT_SECRET=mysecretkey
JWT_EXPIRATION=86400

# Email configurations.
GMAIL_USERNAME="Current ProofBuddy E-Mail"
GMAIL_CLIENT_ID="Your Client ID"
GMAIL_CLIENT_SECRET="Your Client Secret Key"
GMAIL_REFRESH_TOKEN="Current Refresh Token"

# Front-end configurations.
FRONTEND_URL=http://localhost:3000

```