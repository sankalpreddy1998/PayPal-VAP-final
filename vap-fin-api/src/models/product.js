const users = require("./user");
const categories = require("./category");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = new Schema({
    product_name:{
        type: String,
    },
    product_description:{
        type: String,
    },
    brand:{
        type: String,
    },
    price:{
        type: Number,
    },
    cost_price:{
        type: Number,
    },
    mrp:{
        type: Number,
    },
    currency:{
        type: String,
    },
    vendor:{
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (v)=>{                
                let ans = await users.findOne({_id:v});
                console.log(ans);
                return (ans!=null && ans.role=="vendor");
            },
            message: props => `${props.value} is not a valid vendor id`
        },
        ref: "users"
    },
    category_schema:{
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (v)=>{                
                let ans = await categories.findOne({_id:v});
                console.log(ans);
                return (ans!=null);
            },
            message: props => `${props.value} is not a valid category id`
        },
        ref: "categories"
    },
    images:[{
        type: String,
    }],
    product_attributes:{
        type: Object,
    }
})



const Products = mongoose.model('products',productSchema);

module.exports = Products;