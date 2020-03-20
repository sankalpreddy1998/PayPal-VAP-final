const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../../../config/passport');

const isNotCustomer = require('../../../util/middleware/isNotCustomer').isNotCustomer;
const isNotShipper = require('../../../util/middleware/isNotShipper').isNotShipper;
const isNotVendor = require('../../../util/middleware/isNotVendor').isNotVendor;

const InventoryController = require('../../controllers/product_and_inventory_management/inventory');

const isAdminOnly = [isNotCustomer,isNotShipper,isNotVendor];
const authenticate = passport.authenticate('jwt',{session:false});

router.route('/')
    .get(authenticate,isAdminOnly,InventoryController.get_items)
    .post(authenticate,isAdminOnly,InventoryController.post_items);
    
router.route('/:itemId')    
    .get(authenticate,isAdminOnly,InventoryController.get_items_id)
    .put(authenticate,isAdminOnly,InventoryController.put_items_id)
    .patch(authenticate,isAdminOnly,InventoryController.patch_items_id)
    .delete(authenticate,isAdminOnly,InventoryController.delete_items_id);

module.exports = router;

