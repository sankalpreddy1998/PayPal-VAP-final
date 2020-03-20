const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const isNotCustomer = require('../../../util/middleware/isNotCustomer').isNotCustomer;
const isNotShipper = require('../../../util/middleware/isNotShipper').isNotShipper;
const isNotVendor = require('../../../util/middleware/isNotVendor').isNotVendor;

const L2CategoryController = require('../../controllers/category_management/L2-categories');

const {validate_body,schemas_l2_category} = require('../../../util/validators/joi-categories/joi-l2-categories');

const isAdminOnly = [isNotCustomer,isNotShipper,isNotVendor];
const authenticate = passport.authenticate('jwt',{session:false});
const validate_post = validate_body(schemas_l2_category.l2_category_schema);
const validate_patch = validate_body(schemas_l2_category.l2_category_schema_nr);


router.route('/')
    .get(L2CategoryController.get_l2_categories)
    .post(authenticate,isAdminOnly,validate_post,L2CategoryController.post_l2_categories);
    
router.route('/:l2_categoryId')    
    .get(L2CategoryController.get_l2_categories_id)
    .put(authenticate,isAdminOnly,validate_post,L2CategoryController.put_l2_categories_id)
    .patch(authenticate,isAdminOnly,validate_patch,L2CategoryController.patch_l2_categories_id)
    .delete(authenticate,isAdminOnly,L2CategoryController.delete_l2_categories_id);


module.exports = router;