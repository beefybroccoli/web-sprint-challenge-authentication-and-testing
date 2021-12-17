const router = require('express').Router();
const {verifyUsernamePassword,verifyUniqueFreeUsername, hashPassword} = require("./users-middleware");
const modelUsers = require("./users-model");

router.post('/register', verifyUsernamePassword, verifyUniqueFreeUsername, hashPassword, async (req, res, next) => {
  /*
    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }
  */
      try{
          const {username, hashedPassword} = req.body;
          const newId = await modelUsers.addUser({username, password:hashedPassword});
          const newUser = await modelUsers.getById(newId[0]);
          res.status(200).json(newUser[0]);
      }catch(err){
        next(err);
      }
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }
    
    verifyUsernamePassword
    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".
    
    compareUsername, comparePassword
    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
