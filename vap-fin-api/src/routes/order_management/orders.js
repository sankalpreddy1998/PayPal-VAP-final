const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const isNotCustomer = require('../../../util/middleware/isNotCustomer').isNotCustomer;
const isNotShipper = require('../../../util/middleware/isNotShipper').isNotShipper;
const isNotVendor = require('../../../util/middleware/isNotVendor').isNotVendor;

const OrderController = require('../../controllers/order_management/orders');

const isAdminOnly = [isNotCustomer,isNotShipper,isNotVendor];
const authenticate = passport.authenticate('jwt',{session:false});

router.route('/')
    .get(authenticate,isAdminOnly,OrderController.get_orders)
    .post(authenticate,isAdminOnly,OrderController.post_orders);
    
router.route('/:orderId')    
    .get(authenticate,isAdminOnly,OrderController.get_orders_id)
    .put(authenticate,isAdminOnly,OrderController.put_orders_id)
    .patch(authenticate,isAdminOnly,OrderController.patch_orders_id)
    .delete(authenticate,isAdminOnly,OrderController.delete_orders_id);

module.exports = router;

