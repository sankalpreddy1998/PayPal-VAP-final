const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const ShipperController = require('../../controllers/authentication/shipper');

const {validate_body_register,schemas_register} = require('../../../util/validators/joi-auth/joi-auth-registration');
const {validate_body_login,schemas_login} = require('../../../util/validators/joi-auth/joi-auth-token');


router.route('/register')
    .post(validate_body_register(schemas_register.auth_schema),ShipperController.shipper_signup);

router.route('/token')
    .post(validate_body_login(schemas_login.auth_schema),ShipperController.shipper_signin);


module.exports = router;