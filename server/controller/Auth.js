const { User } = require('../model/User');
const crypto = require('crypto');
const { sanitizeUser } = require('../services/common');
const SECRET_KEY = 'SECRET_KEY';
const jwt = require('jsonwebtoken');
 

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();

        req.login(sanitizeUser(doc), (err) => {  // this also calls serializer and adds to session
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            res
            .cookie('jwt', token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true,
            })
            .status(201)
            .json({id:doc.id, role:doc.role});
           
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.loginUser = async (req, res) => {
  console.log("auth controller was called");
  console.log(req.user);
  res
    .cookie('jwt', req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};
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

exports.checkAuth = async (req, res) => {
  if(req.user){
    console.log("we found user");
    res.json(req.user);
  } else{
    console.log("something error");
    res.sendStatus(401);
  }
}

