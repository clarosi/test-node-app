const express = require('express');
const router = express.Router();
const { body } = require("express-validator/check");
const utilsFunctions = require('../../shared/utils/functions');

const User = require('../models/user');

const userController = require('../controllers/user');

router.post('/signup',
[
  body("email")
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom((value, {req}) => {
      return User.findOne({email: value})
        .then(result => {
          if (result) {
            return Promise.reject('Email already exists.');
          }
        })
        .catch(err => {
          utilsFunctions.customError(err.message, 422);
        })
    })
    .normalizeEmail(),
  body("password") 
    .trim()
    .isLength({ min: 5 })
    .not()
    .isEmpty(),
  body("name")
    .trim()
    .isLength({ min: 5 })
    .not()
    .isEmpty()
], 
userController.signup
);

module.exports = router;