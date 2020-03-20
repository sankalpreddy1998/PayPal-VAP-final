const {url} = require("../../../config/url") 
const mongoose = require("mongoose");
const Categories = require("../../models/category");
const L2_categories = require("../../models/L2-category");

module.exports = {

    get_categories: async(req,res,next) => {
        try {
            const result = await Categories.find({});
            res.status(200).json({data:result,links:[
                {
                    "href":url+"/categories",
                    "method":"POST",
                    "rel":"Add-new-category"
                },
                {
                    "href":url+"/categories/{categoryId}",
                    "method":"GET",
                    "rel":"Get-a-particular-categories"
                }
            ]});
        } catch (error) {
            next(error);
        }
    },

    post_categories: async(req,res,next) => {

        try {
            //check if user exist with the given role
            const foundUser = await Categories.findOne({name:req.body.name});
            if (foundUser) {
                return res.status(409).json({error:"category already exists"});
            }

            const rec = new Categories(req.body);

            //save new user
            await rec.save();

            //send token
            res.status(201).json({message:"category added"});
        } catch (error) {
            next(error);
        }
        

    },


    get_categories_id: async(req,res,next) => {
        try {
            const result = await Categories.findById(req.params.categoryId);
            res.status(200).json({data:result,links:[]});
        } catch (error) {
            next(error);
        }
    },

    put_categories_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Categories.findByIdAndUpdate(req.params.categoryId,req.body);

            //send token
            res.status(204).json({message:"category updated"});

        } catch (error) {
            next(error);
        }
    },

    delete_categories_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await L2_categories.updateMany({},{'$pullAll':{
                'sub_categories': [req.params.categoryId]
            }});
            await Categories.findByIdAndDelete(req.params.categoryId);         

            //send token
            res.status(204).json({message:"category deleted"});

        } catch (error) {
            next(error);
        }
    },

    patch_categories_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Categories.findByIdAndUpdate(req.params.categoryId,req.body);

            //send token
            res.status(204).json({message:"category field updated"});

        } catch (error) {
            next(error);
        }
    },

}
