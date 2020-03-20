const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name:{
        type: String,
    },
    category_schema:{
        type: Object,
    },
})



const Categories = mongoose.model('categories',categorySchema);

module.exports = Categories;