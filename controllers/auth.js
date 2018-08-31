const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  });
  if(candidate) {
    // User exist
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if(passwordResult) {
      // Generating token
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jsonwebtokem, {
        expiresIn: 60 * 60
      });
      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      // Password error
      res.status(401).json({
        message: "Wrong password"
      });
    }
  } else {
    // User are not registered
    res.status(404).json({
      message: "User are not registered"
    });
  }
}

module.exports.register = async function(req, res) {
  const canditade = await User.findOne({email: req.body.email});

  if(canditade) {
    // User is exist
    res.status(409).json({
      message: "This email is already exist, please try another"
    })
  } else {
    // Generate hash
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    // Create new user
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch(e) {
      // Error
    }

  }
}