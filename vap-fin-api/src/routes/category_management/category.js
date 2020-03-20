const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const isNotCustomer = require('../../../util/middleware/isNotCustomer').isNotCustomer;
const isNotShipper = require('../../../util/middleware/isNotShipper').isNotShipper;
const isNotVendor = require('../../../util/middleware/isNotVendor').isNotVendor;

const CategoryController = require('../../controllers/category_management/category');

const {validate_body,schemas_category} = require('../../../util/validators/joi-categories/joi-categories');

const isAdminOnly = [isNotCustomer,isNotShipper,isNotVendor];
const authenticate = passport.authenticate('jwt',{session:false});
const validate_post = validate_body(schemas_category.category_schema);
const validate_patch = validate_body(schemas_category.category_schema_nr);


router.route('/')
    .get(CategoryController.get_categories)
    .post(authenticate,isAdminOnly,validate_post,CategoryController.post_categories);
    
router.route('/:categoryId')    
    .get(CategoryController.get_categories_id)
    .put(authenticate,isAdminOnly,validate_post,CategoryController.put_categories_id)
    .patch(authenticate,isAdminOnly,validate_patch,CategoryController.patch_categories_id)
    .delete(authenticate,isAdminOnly,CategoryController.delete_categories_id);


module.exports = router;





// const {validation_body,schemas} = require('../util/validators/joi-auth');

// router.route('/signup')
//     .post(validation_body(schemas.auth_schema),UsersController.signup);