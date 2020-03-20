const mongoose = require("mongoose");
const Categories = require("../../models/category");
const users = require("../../models/user");
const Products = require("../../models/product");
const {json_to_joi} = require("../../../util/services/service_json-to-joi");
const joi = require('joi');
const {url} = require("../../../config/url");



module.exports = {

    get_products: async(req,res,next) => {
        try {
            const result = await Products.find({});
            res.status(200).json({data:result,links:[
                {
                    "href":url+"/products/{productId}",
                    "method":"get",
                    "rel":"get-particular-product"
                },
                {
                    "href":url+"/products/{productId}/attributes",
                    "method":"get",
                    "rel":"get-particular-product's-attributes"
                }
            ]});
        } catch (error) {
            next(error);
        }
    },

    post_products: async(req,res,next) => {

        try {
            //check if user exist with the given role
            const foundUser = await Products.findOne({product_name:req.body.product_name});
            if (foundUser) {
                return res.status(403).json({error:"product already exists"});
            }

            const rec = new Products(req.body);

            //save new user
            await rec.save();

            //send token
            res.status(201).json({message:"product added"});
        } catch (error) {
            next(error);
        }
        

    },


    get_products_id: async(req,res,next) => {
        try {
            const result = await Products.findById(req.params.productId);
            res.status(200).json({data:result,links:[    
            {
                "href":url+"/products/"+req.params.productId+"/attributes",
                "method":"get",
                "rel":"get-product's-attributes"
            }
        ]});
        } catch (error) {
            next(error);
        }
    },

    put_products_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Products.findByIdAndUpdate(req.params.productId,req.body);

            //send token
            res.status(204).json({message:"product updated"});

        } catch (error) {
            next(error);
        }
    },

    delete_products_id: async(req,res,next) => {

        try {
            await Products.findByIdAndDelete(req.params.productId);         

            //send token
            res.status(204).json({message:"product deleted"});

        } catch (error) {
            next(error);
        }
    },

    patch_products_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Products.findByIdAndUpdate(req.params.productId,req.body);

            //send token
            res.status(204).json({message:"product field updated"});

        } catch (error) {
            next(error);
        }
    },







    get_products_id_attributes: async(req,res,next) => {
        try {
            const result = await Products.findById(req.params.productId);
            res.status(200).json(result.product_attributes);
        } catch (error) {
            next(error);
        }
    },

    post_products_id_attributes: async(req,res,next) => {

        try {
            //check if user exist with the given role
            const product = await Products.findById(req.params.productId).populate('category_schema');
            var jsonSchema =  product.category_schema.category_schema;

            var schema = json_to_joi(jsonSchema);
            // console.log(schema);
            
            const result = joi.validate(req.body.product_attributes,schema);
            if(result.error){
                console.log(result);
                return res.status(400).json(res.error);
            }

            await Products.findByIdAndUpdate(req.params.productId,req.body);


            //send token
            res.status(204).json(result.value);

        } catch (error) {
            next(error);
        }
    },

    delete_products_id_attributes: async(req,res,next) => {

        try {
            await Products.findByIdAndUpdate(req.params.productId, {$unset: {product_attributes: "" }});     

            //send token
            res.status(204).json({message:"product deleted"});

        } catch (error) {
            next(error);
        }
    },

    put_products_id_attributes: async(req,res,next) => {

        try {
            //check if user exist with the given role
            const product = await Products.findById(req.params.productId).populate('category_schema');
            var jsonSchema =  product.category_schema.category_schema;

            var schema = json_to_joi(jsonSchema);
            // console.log(schema);
            
            const result = joi.validate(req.body.product_attributes,schema);
            if(result.error){
                console.log(result);
                return res.status(400).json(res.error);
            }

            await Products.findByIdAndUpdate(req.params.productId,req.body);


            //send token
            res.status(204).json(result.value);
        } catch (error) {
            next(error);
        }
    },

}
