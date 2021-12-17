const router = require('express').Router();
const modelUsers = require("./users-model");
const { verifyUsernamePassword, verifyUniqueFreeUsername, hashPassword, verifyCredentials, buildToken } = require("./users-middleware");

router.post('/register', verifyUsernamePassword, verifyUniqueFreeUsername, hashPassword, async (req, res, next) => {
  try {
    const { username, hashedPassword } = req.body;
    const newId = await modelUsers.addUser({ username, password: hashedPassword });
    const newUser = await modelUsers.getById(newId[0]);
    res.status(200).json(newUser[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/login', verifyUsernamePassword, verifyCredentials, buildToken, async (req, res, next) => {
  try {
    const { username, token } = req.authenticatedUser;
    res.status(200).json({ message: `welcome, ${username}`, token });

  } catch (err) {
    next(err);
  }

});

module.exports = router;
