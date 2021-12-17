const { BCRYPT_ROUND} = require("../../env");

async function verifyUsernamePassword ( req, res, next){
    
    // 3- On FAILED registration due to `username` or `password` missing from the request body, the response body should include a string exactly as follows: "username and password required".
    
    next();

}

async function verifyUniqueFreeUsername(req, res, next){
        
    // 4- On FAILED registration due to the `username` being taken, the response body should include a string exactly as follows: "username taken".

    // 1- In order to register a new account the client must provide `username` and `password`:
    //       {
    //         "username": "Captain Marvel", // must not exist already in the `users` table
    //         "password": "foobar"          // needs to be hashed before it's saved
    //       }

    next();
}

async function hashPassword (req, res, next){

    // IMPLEMENT -  You are welcome to build additional middlewares to help with the endpoint's functionality. DO NOT EXCEED 2^8 ROUNDS OF HASHING!
    //BCRYPT_ROUND

    next();
}

async function compareUsername (req, res, next){
    next();
}

async function comparePassword( req, res, next){
    next();
}
