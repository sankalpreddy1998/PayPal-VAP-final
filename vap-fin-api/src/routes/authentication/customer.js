const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const CustomerController = require('../../controllers/authentication/customer');

const {validate_body_register,schemas_register} = require('../../../util/validators/joi-auth/joi-auth-registration');
const {validate_body_login,schemas_login} = require('../../../util/validators/joi-auth/joi-auth-token');


router.route('/register')
    .post(validate_body_register(schemas_register.auth_schema),CustomerController.customer_signup);

router.route('/token')
    .post(validate_body_login(schemas_login.auth_schema),CustomerController.customer_signin);


module.exports = router;