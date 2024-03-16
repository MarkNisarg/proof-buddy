A list of the User API endpoints and their functions.

### `/api/v1/auth/signup`

* `POST` : Register a new user.

### `/api/v1/auth/signin`

* `POST` : Sign in an existing user.

### `/api/v1/auth/verify-email`

* `GET` : Verify user email (query parameter: `token`).

### `/api/v1/users/profile`

* `GET` : Get profile of the logged-in user (authentication required).