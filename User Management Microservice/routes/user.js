const express = require('express');
const User = require('../models/user');
const router = express.Router();

const controller = require('../controllers/user');

//user signup
router.post('/signUp', controller.signup);

//user login
router.post('/signIn', controller.login);

//user email validation
router.post('/validateFirstConnection', controller.validateFirstConnection);

/*Post route for reset password link*/
router.post('/resetPasswordLink', controller.resetPasswordLink);

/*Post route for reset password*/
router.post('/resetPassword', controller.resetPassword);

/*Post route for reset password link*/
router.post('/confirmUserEmailLink', controller.confirmUserEmailLink);

/*Post route for email confirmation*/
router.post('/confirmEmail', controller.confirmEmail);

/*Post route for token verification */
router.post('/handleTokenVerification', controller.handleTokenVerification);

/*Post route for OTP validation */
router.post('/validateOtp', controller.validateOtp);

module.exports = router;
