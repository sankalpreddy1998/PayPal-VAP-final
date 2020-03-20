const products = require("./product");
const categories = require("./category");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (v)=>{                
                let ans = await products.findOne({_id:v});
                return (ans!=null);
            },
            message: props => `${props.value} is not a valid product id`
        },
        ref: "products"
    },
    quantity:{
        type: Number,
    },
    status:{
        type: String,
    },
    payment_method:{
        type: String,
    },
    customer:{
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (v)=>{                
                let ans = await users.findOne({_id:v,role:"customer"});
                return (ans!=null);
            },
            message: props => `${props.value} is not a valid customer id`
        },
        ref: "products"
    },
    shipping_agent:{
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (v)=>{                
                let ans = await users.findOne({_id:v,role:"shipper"});
                return (ans!=null);
            },
            message: props => `${props.value} is not a valid shipper id`
        },
        ref: "products"
    }
})



const order = mongoose.model('orders',OrderSchema);

module.exports = order;