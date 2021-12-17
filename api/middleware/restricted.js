const {verifyToken} = require("../auth/users-middleware");

function restrict (req, res, next) {
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
    if ( typeof req.headers.authorization === 'undefined'){
      res.status(400).json({message:'token required'});
    }else if (!verifyToken(req)){
      res.status(400).json({message:'token invalid'});
    }else{
      next();
    }
};

module.exports = {restrict};