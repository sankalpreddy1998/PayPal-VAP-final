const Order = require("../../models/order");


module.exports = {

    get_orders: async(req,res,next) => {
        try {
            const result = await Order.find({});
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    post_orders: async(req,res,next) => {

        try {
            const rec = new Order(req.body);

            //save new user
            await rec.save();

            //send token
            res.status(201).json({message:"order added"});
        } catch (error) {
            next(error);
        }
        

    },



    get_orders_id: async(req,res,next) => {
        try {
            const result = await Order.findById(req.params.orderId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    put_orders_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Order.findByIdAndUpdate(req.params.orderId,req.body);

            //send token
            res.status(204).json({message:"order updated"});

        } catch (error) {
            next(error);
        }
    },

    delete_orders_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Order.findByIdAndDelete(req.params.orderId);

            //send token
            res.status(204).json({message:"order deleted"});

        } catch (error) {
            next(error);
        }
    },

    patch_orders_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Order.findByIdAndUpdate(req.params.orderId,req.body);

            //send token
            res.status(204).json({message:"order field updated"});

        } catch (error) {
            next(error);
        }
    },

}
