const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const isNotCustomer = require('../../../util/middleware/isNotCustomer').isNotCustomer;
const isNotShipper = require('../../../util/middleware/isNotShipper').isNotShipper;
const isNotVendor = require('../../../util/middleware/isNotVendor').isNotVendor;

const ProductController = require('../../controllers/product_and_inventory_management/product');

const {validate_body_add_user,schemas_add_user,validate_address,validate_address_only} = require('../../../util/validators/joi-users/joi-users');

const isAdminOnly = [isNotCustomer,isNotShipper,isNotVendor];
const authenticate = passport.authenticate('jwt',{session:false});


router.route('/')
    .get(ProductController.get_products) 
    .post(authenticate,isAdminOnly,ProductController.post_products);
    
router.route('/:productId')    
    .get(ProductController.get_products_id)
    .put(authenticate,isAdminOnly,ProductController.put_products_id)
    .patch(authenticate,isAdminOnly,ProductController.patch_products_id)
    .delete(authenticate,isAdminOnly,ProductController.delete_products_id);

router.route('/:productId/attributes')    
    .get(ProductController.get_products_id_attributes)
    .post(authenticate,isAdminOnly,ProductController.post_products_id_attributes)
    .put(authenticate,isAdminOnly,ProductController.put_products_id_attributes)
    .delete(authenticate,isAdminOnly,ProductController.delete_products_id_attributes);


module.exports = router;





// const {validation_body,schemas} = require('../util/validators/joi-auth');

// router.route('/signup')
//     .post(validation_body(schemas.auth_schema),UsersController.signup);