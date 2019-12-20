const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      // const token ="a token"
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token =signToken(user)
        res.status(200).json({
          token, // added token as part of the response sent - this was missing
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//this whole function was missing.
function signToken(user) {
  const payload = {
    username: user.username,
    // role: "student", // this will come from the database users.role
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options); // notice the return
}


 


module.exports = router;
