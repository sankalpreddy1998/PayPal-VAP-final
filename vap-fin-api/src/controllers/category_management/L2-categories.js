const {url} = require("../../../config/url");
const L1_categories = require("../../models/L1-category");
const L2_categories = require("../../models/L2-category");

module.exports = {

    get_l2_categories: async(req,res,next) => {
        try {
            console.log(url);
            
            const result = await L2_categories.find({}).populate('sub_categories',['_id','name']);
            res.status(200).json({data:result,links:[
                {
                    "href":url+"/categories",
                    "method":"get",
                    "rel":"get-all-categories"
                },
                {
                    "href":url+"/categories/{categoryId}",
                    "method":"get",
                    "rel":"get-particular-category"
                },
            ]});
        } catch (error) {
            next(error);
        }
    },

    post_l2_categories: async(req,res,next) => {

        try {
            //check if user exist with the given role
            const foundUser = await L2_categories.findOne({name:req.body.name});
            if (foundUser) {
                return res.status(409).json({error:"l2_category already exists"});
            }

            const rec = new L2_categories(req.body);

            //save new user
            await rec.save();

            //send token
            res.status(201).json({message:"l2_category added"});
        } catch (error) {
            next(error);
        }
        

    },


    get_l2_categories_id: async(req,res,next) => {
        try {
            const result = await L2_categories.findById(req.params.l2_categoryId).populate('sub_categories',['_id','name']);
            console.log(req.params.l2_categoryId);
            
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    put_l2_categories_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await L2_categories.findByIdAndUpdate(req.params.l2_categoryId,req.body,{runValidators:true});

            //send token
            res.status(204).json({message:"l2_category updated"});

        } catch (error) {
            next(error);
        }
    },

    delete_l2_categories_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await L1_categories.updateMany({},{'$pullAll':{
                'sub_categories': [req.params.l2_categoryId]
            }});
            await L2_categories.findByIdAndDelete(req.params.l2_categoryId);

            //send token
            res.status(204).json({message:"l2_category deleted"});

        } catch (error) {
            next(error);
        }
    },

    patch_l2_categories_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await L2_categories.findByIdAndUpdate(req.params.l2_categoryId,req.body,{runValidators:true});

            //send token
            res.status(204).json({message:"l2_category field updated"});

        } catch (error) {
            next(error);
        }
    },

}
