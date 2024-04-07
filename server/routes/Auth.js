const express = require('express');
const { createUser, loginUser,checkAuth } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();
//  /auth is already added in base path
router.post('/signup', createUser)
.post('/login', passport.authenticate('local'), loginUser)
.get('/check',passport.authenticate('jwt'), checkAuth);
exports.router = router;
 
/**User Submits Credentials:
The user submits their credentials (email and password) to the /login endpoint.
Local Authentication Middleware:
The passport.authenticate('local') middleware is invoked. This middleware triggers the execution of the local strategy configured earlier.
Local Strategy Execution:
The local strategy authenticates the user based on the provided email and password. If the authentication is successful, it hashes the entered password and compares it with the stored hashed password in the database.
Token Generation:
If the authentication is successful, a JWT token is generated using jwt.sign with the user information. This token is attached to the req.user object.
Login Controller Execution:
The loginUser controller is executed. It logs a message, prints the req.user object (which includes the user's token), sets a cookie named 'jwt' with the token, and responds with the token in JSON format.
Response to the Client:
The client receives the JSON response containing the user's token. Additionally, a cookie named 'jwt' is set in the client's browser. **/