//import packages
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


//create port
const port = 3000;


//create server
const app = express();



//import routes
const admin_router = require('./src/routes/authentication/admin');
const customer_router = require('./src/routes/authentication/customer');
const shipper_router = require('./src/routes/authentication/shipper');
const vendor_router = require('./src/routes/authentication/vendor');

const user_router = require('./src/routes/user_management/users');

const category_router = require('./src/routes/category_management/category');
const L2_category_router = require('./src/routes/category_management/L2-categories');
const L1_category_router = require('./src/routes/category_management/L1-categories');

const product_router = require('./src/routes/product_and_inventory_management/products');
const inventory_router = require('./src/routes/product_and_inventory_management/inventory');

const order_router = require('./src/routes/order_management/orders');



//middleware
app.use(morgan('dev'));
app.use(express.json());



//connect with mongodb
mongoose.connect('mongodb://localhost/vap_fin',{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;



//route requests to routers
app.use('/admin',admin_router);
app.use('/customer',customer_router);
app.use('/shipper',shipper_router);
app.use('/vendor',vendor_router);

app.use('/users',user_router);

app.use('/categories',category_router);
app.use('/L2-categories',L2_category_router);
app.use('/L1-categories',L1_category_router);

app.use('/products',product_router);
app.use('/inventory',inventory_router);

app.use('/orders',order_router);


//start server
app.listen(port,console.log(`Server running at: ${port}`));