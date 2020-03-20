const Category = require('./category');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const L2_categorySchema = new Schema({
    name:{
        type: String,
    },
    sub_categories:[{
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (v)=>{
                console.log("hi:"+v);
                
                let ans = await Category.findOne({_id:v});
                console.log(ans);
                return (ans!=null);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        ref: "categories"
    }]
})



const L2_categories = mongoose.model('L2_categories',L2_categorySchema);

module.exports = L2_categories;