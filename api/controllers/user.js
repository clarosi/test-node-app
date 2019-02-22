const { validationResult } = require('express-validator/check');
const utilsFunctions = require('../../shared/utils/functions');

const User = require('../models/user');

module.exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    utilsFunctions.customError('Validation failed.', 422);
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name; 
}

module.exports.signup = (req, res, next) => {
  res.status(200).json({message: 'Welcome to default end point.'}); 
}