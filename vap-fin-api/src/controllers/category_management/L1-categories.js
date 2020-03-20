const {url} = require("../../../config/url");
const L1_categories = require("../../models/L1-category");

module.exports = {

    get_l1_categories: async(req,res,next) => {
        try {
            const result = await L1_categories.find({}).populate('sub_categories',['id','name']);
            res.status(200).json({data:result,links:[
                {
                    "href":url+"/L2-categories",
                    "method":"get",
                    "rel":"get-all-L2-category"
                },
                {
                    "href":url+"/L2-categories/{l2_categoryId}",
                    "method":"get",
                    "rel":"get-particular-L2-category"
                },
            ]});
        } catch (error) {
            next(error);
        }
    },

    post_l1_categories: async(req,res,next) => {

        try {
            //check if user exist with the given role
            const foundUser = await L1_categories.findOne({name:req.body.name});
            if (foundUser) {
                return res.status(409).json({error:"l1_category already exists"});
            }

            const rec = new L1_categories(req.body);

            //save new user
            await rec.save();

            //send token
            res.status(201).json({message:"l1_category added"});
        } catch (error) {
            next(error);
        }
        

    },


    get_l1_categories_id: async(req,res,next) => {
        try {
            const result = await L1_categories.findById(req.params.l1_categoryId).populate('sub_categories',['_id','name']);
            console.log(req.params.l1_categoryId);
            
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    put_l1_categories_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await L1_categories.findByIdAndUpdate(req.params.l1_categoryId,req.body,{runValidators:true});

            //send token
            res.status(204).json({message:"l1_category updated"});

        } catch (error) {
            next(error);
        }
    },

    delete_l1_categories_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await L1_categories.findByIdAndDelete(req.params.l1_categoryId);

            //send token
            res.status(204).json({message:"l1_category deleted"});

        } catch (error) {
            next(error);
        }
    },

    patch_l1_categories_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await L1_categories.findByIdAndUpdate(req.params.l1_categoryId,req.body,{runValidators:true});

            //send token
            res.status(204).json({message:"l1_category field updated"});

        } catch (error) {
            next(error);
        }
    },

}
