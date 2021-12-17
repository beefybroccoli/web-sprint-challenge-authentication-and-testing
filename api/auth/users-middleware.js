const { BCRYPT_ROUND} = require("../../env");
const {verifyString, isEmptyArray} = require("../helper");
const modelUsers = require("./users-model");
const bcrypt = require("bcrypt");

async function verifyUsernamePassword ( req, res, next){
    
    // 3- On FAILED registration due to `username` or `password` missing from the request body, the response body should include a string exactly as follows: "username and password required".
    try{
        const {username, password} = req.body
        if(!verifyString(username) || !verifyString(password)){
            res.status(400).json({message:"username and password required"});
        }else{
            next();
        }
    }catch(err){
        next(err);
    }
}

async function verifyUniqueFreeUsername(req, res, next){
        
    // 4- On FAILED registration due to the `username` being taken, the response body should include a string exactly as follows: "username taken".

    // 1- In order to register a new account the client must provide `username` and `password`:
    //       {
    //         "username": "Captain Marvel", // must not exist already in the `users` table
    //         "password": "foobar"          // needs to be hashed before it's saved
    //       }
    try{
        const {username} = req.body;
        const array = await modelUsers.getBy({"username":username});
        if (isEmptyArray(array)){
            next();
        }else{
            res.status(400).json({message:"username taken"});
        }
    }catch(err){
        next(err);
    }
}

async function hashPassword (req, res, next){
    req.body.hashedPassword = bcrypt.hashSync(req.body.password, BCRYPT_ROUND);
    next();
}

async function verifyCredentials (req, res, next){
    const{username, password} = req.body;
    const array = await modelUsers.getBy({username});
    if(isEmptyArray(array) || bcrypt.compareSync(password, array[0].password) === false){
        res.status(400).json({message:"invalid credentials"});
    }else{
        req.authenticatedUser = array[0];
        next();
    }
}

async function buildToken (req, res, next){

    req.authenticatedUser.token = 'empty token';
    next();
}

module.exports = {verifyUsernamePassword, verifyUniqueFreeUsername, hashPassword, verifyCredentials, buildToken};