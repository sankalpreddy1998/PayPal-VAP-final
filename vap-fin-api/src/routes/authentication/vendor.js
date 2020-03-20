const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const VendorController = require('../../controllers/authentication/vendor');

const {validate_body_register,schemas_register} = require('../../../util/validators/joi-auth/joi-auth-registration');
const {validate_body_login,schemas_login} = require('../../../util/validators/joi-auth/joi-auth-token');


router.route('/register')
    .post(validate_body_register(schemas_register.auth_schema),VendorController.vendor_signup);

router.route('/token')
    .post(validate_body_login(schemas_login.auth_schema),VendorController.vendor_signin);


module.exports = router;