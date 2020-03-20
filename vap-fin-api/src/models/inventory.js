const products = require("./product");
const categories = require("./category");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const InventorySchema = new Schema({
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
    color:{
        type: String,
    },
    sku:{
        type: String,
    },
    total_quantity:{
        type: Number,
    },
    available_quantity:{
        type: Number,
    },
    blocked_quantity:{
        type: Number,
    }
})



const inventory = mongoose.model('inventory',InventorySchema);

module.exports = inventory;