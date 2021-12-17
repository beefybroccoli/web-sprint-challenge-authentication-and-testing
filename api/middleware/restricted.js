const { verifyToken } = require("../auth/users-middleware");

function restrict(req, res, next) {
  if (typeof req.headers.authorization === 'undefined') {
    res.status(400).json({ message: 'token required' });
  } else if (!verifyToken(req)) {
    res.status(400).json({ message: 'token invalid' });
  } else {
    next();
  }
};

module.exports = { restrict };