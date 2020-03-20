const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const isNotCustomer = require('../../../util/middleware/isNotCustomer').isNotCustomer;
const isNotShipper = require('../../../util/middleware/isNotShipper').isNotShipper;
const isNotVendor = require('../../../util/middleware/isNotVendor').isNotVendor;

const L1CategoryController = require('../../controllers/category_management/L1-categories');

const {validate_body,schemas_l1_category} = require('../../../util/validators/joi-categories/joi-l1-categories');

const isAdminOnly = [isNotCustomer,isNotShipper,isNotVendor];
const authenticate = passport.authenticate('jwt',{session:false});
const validate_post = validate_body(schemas_l1_category.l1_category_schema);
const validate_patch = validate_body(schemas_l1_category.l1_category_schema_nr);


router.route('/')
    .get(L1CategoryController.get_l1_categories)
    .post(authenticate,isAdminOnly,validate_post,L1CategoryController.post_l1_categories);
    
router.route('/:l1_categoryId')    
    .get(L1CategoryController.get_l1_categories_id)
    .put(authenticate,isAdminOnly,validate_post,L1CategoryController.put_l1_categories_id)
    .patch(authenticate,isAdminOnly,validate_patch,L1CategoryController.patch_l1_categories_id)
    .delete(authenticate,isAdminOnly,L1CategoryController.delete_l1_categories_id);


module.exports = router;





// const {validation_body,schemas} = require('../util/validators/joi-auth');

// router.route('/signup')
//     .post(validation_body(schemas.auth_schema),UsersController.signup);