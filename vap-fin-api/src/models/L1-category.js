const L2_category = require('./L2-category');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const L1_categorySchema = new Schema({
    name:{
        type: String,
    },
    sub_categories:[{
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (v)=>{
                let ans = await L2_category.findById(v);
                console.log(ans);
                return (ans!=null);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        ref: "L2_categories"
    }]
})

const L1_categories = mongoose.model('L1_categories',L1_categorySchema);

module.exports = L1_categories;