const User = require('../models/User');

module.exports.login = function(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  });
}

module.exports.register = async function(req, res) {
  const canditade = await User.findOne({email: req.body.email});

  if(canditade) {
    // User is exist
    
  } else {
    // Create new user
  }
}