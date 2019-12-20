// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const Users = require('../users/users-model.js');




module.exports = (req, res, next) => {
  const {authorization} = req.headers
if(authorization) {
  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  jwt.verify(authorization, secret,  function (err, decodedToken) {
    if (err) {
      // console.error(err.name, err.message);
      res.status(401).json({ message: "Invalid Token" });
    } else {
      // console.log(decoded);
      req.token=decodedToken }
      next()
    })
  }
  else {
     res.status(400).json({ message: 'Please try and login again' });
   }
 } 
