1. Now that you have succesfully created the "credentials" and "client" in Google Cloud, its time to make changes in your '/server/.env' file. The next few steps will detail how to do this:

2. Follow the below format to edit your '/server/.env' file:

Note: Do not remove anything from the .env file that was already present, but rather simply append the information starting from 'Email Configurations'.

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
GMAIL_USERNAME=your_gmail.com_account_you_used_for_OAuth
GMAIL_CLIENT_ID=your_client_id_from_step_5
GMAIL_CLIENT_SECRET=your_client_secret_from_step_5
GMAIL_ACCESS_TOKEN=your_access_token_that_you_got_from_step_15
GMAIL_REFRESH_TOKEN=your_refresh_token_that_you_got_from_step_21

# Front-end configurations.
FRONTEND_URL=http://localhost:3000

```

3. Save the file, and restart your server. In the terminal running your server, press 'Control + C' to terminate the server. Then type 'npm start', to restart your server.

4. Congratulations! You have fully set up the current version of Proof Buddy.