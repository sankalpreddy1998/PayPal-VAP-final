const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const isNotCustomer = require('../../../util/middleware/isNotCustomer').isNotCustomer;
const isNotShipper = require('../../../util/middleware/isNotShipper').isNotShipper;
const isNotVendor = require('../../../util/middleware/isNotVendor').isNotVendor;

const UserController = require('../../controllers/user_management/users');

const {validate_body_add_user,schemas_add_user,validate_address,validate_address_only} = require('../../../util/validators/joi-users/joi-users');

const isAdminOnly = [isNotCustomer,isNotShipper,isNotVendor];
const authenticate = passport.authenticate('jwt',{session:false});
const validate_post = validate_body_add_user(schemas_add_user.auth_schema);
const validate_patch = validate_body_add_user(schemas_add_user.patch_schema);
const validate_patch_address = validate_address(schemas_add_user.address_schema_array);
const validate_addr = validate_address_only(schemas_add_user.address_schema);
const validate_addr_not_required = validate_address_only(schemas_add_user.address_schema_not_required);

router.route('/')
    .get(authenticate,isAdminOnly,UserController.get_users)
    .post(authenticate,isAdminOnly,validate_post,UserController.post_users);
    
router.route('/:userId')    
    .get(authenticate,isAdminOnly,UserController.get_users_id)
    .put(authenticate,isAdminOnly,validate_post,UserController.put_users_id)
    .patch(authenticate,isAdminOnly,validate_patch,validate_patch_address,UserController.patch_users_id)
    .delete(authenticate,isAdminOnly,UserController.delete_users_id);

router.route('/:userId/address')    
    .get(authenticate,isAdminOnly,UserController.get_users_address)
    .post(authenticate,isAdminOnly,validate_addr,UserController.post_users_address);

router.route('/:userId/address/:addressId')    
    .get(authenticate,isAdminOnly,UserController.get_users_address_id)
    .put(authenticate,isAdminOnly,validate_addr,UserController.put_users_address_id)
    .patch(authenticate,isAdminOnly,validate_addr_not_required,UserController.patch_users_address_id)
    .delete(authenticate,isAdminOnly,UserController.delete_users_address_id);

module.exports = router;





// const {validation_body,schemas} = require('../util/validators/joi-auth');

// router.route('/signup')
//     .post(validation_body(schemas.auth_schema),UsersController.signup);