const Inventory = require("../../models/inventory");


module.exports = {

    get_items: async(req,res,next) => {
        try {
            const result = await Inventory.find({});
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    post_items: async(req,res,next) => {

        try {
            //check if user exist with the given role
            const foundUser = await Inventory.findOne({product:req.body.product});
            if (foundUser) {
                return res.status(403).json({error:"item already exists"});
            }

            const rec = new Users(req.body);

            //save new user
            await rec.save();

            //send token
            res.status(201).json({message:"item added"});
        } catch (error) {
            next(error);
        }
        

    },



    get_items_id: async(req,res,next) => {
        try {
            const result = await Inventory.findById(req.params.itemId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    put_items_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Inventory.findByIdAndUpdate(req.params.itemId,req.body);

            //send token
            res.status(204).json({message:"user updated"});

        } catch (error) {
            next(error);
        }
    },

    delete_items_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Inventory.findByIdAndDelete(req.params.itemId);

            //send token
            res.status(204).json({message:"item deleted"});

        } catch (error) {
            next(error);
        }
    },

    patch_items_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Inventory.findByIdAndUpdate(req.params.itemId,req.body);

            //send token
            res.status(204).json({message:"item field updated"});

        } catch (error) {
            next(error);
        }
    },

}
