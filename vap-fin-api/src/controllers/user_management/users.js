const Users = require("../../models/user");
const {url} = require("../../../config/url")

module.exports = {

    get_users: async(req,res,next) => {
        try {
            const role = (req.query.role==undefined) ? {} : {role:req.query.role};
            const result = await Users.find(role);
            res.status(200).json({data:result,links:[
                {
                    "href":url+"/users?role=customer",
                    "method":"GET",
                    "rel":"Get-Customers"
                },
                {
                    "href":url+"/users?role=admin",
                    "method":"GET",
                    "rel":"Get-Administrators"
                },
                {
                    "href":url+"/users?role=shipper",
                    "method":"GET",
                    "rel":"Get-Shippers"
                },
                {
                    "href":url+"/users?role=vendors",
                    "method":"GET",
                    "rel":"Get-Vendors"
                }
            ]});
        } catch (error) {
            next(error);
        }
    },

    post_users: async(req,res,next) => {

        try {
            //check if user exist with the given role
            const foundUser = await Users.findOne({email:req.body.email,role:req.body.role});
            if (foundUser) {
                return res.status(403).json({error:"account already exists"});
            }

            const rec = new Users(req.body);

            //save new user
            await rec.save();

            //send token
            res.status(201).json({message:"user added"});
        } catch (error) {
            next(error);
        }
        

    },



    get_users_id: async(req,res,next) => {
        try {
            const result = await Users.findById(req.params.userId);
            res.status(200).json({data:result,links:[
                {
                    "href":url+"/users/"+req.params.userId,
                    "method":"PUT",
                    "rel":"Update-user"
                },
                {
                    "href":url+"/users/"+req.params.userId,
                    "method":"PATCH",
                    "rel":"Update-user-field"
                },
                {
                    "href":url+"/users/"+req.params.userId,
                    "method":"DELETE",
                    "rel":"Delete-user"
                },
                {
                    "href":url+"/users/"+req.params.userId+"/address",
                    "method":"GET",
                    "rel":"Get-user's-list-of-addresses"
                },
                {
                    "href":url+"/users/"+req.params.userId+"/address",
                    "method":"POST",
                    "rel":"Add-address-to-user's-list-of-addresses"
                }
            ]});
        } catch (error) {
            next(error);
        }
    },

    put_users_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Users.findByIdAndUpdate(req.params.userId,req.body);

            //send token
            res.status(204).json({message:"user updated"});

        } catch (error) {
            next(error);
        }
    },

    delete_users_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Users.findByIdAndDelete(req.params.userId);

            //send token
            res.status(204).json({message:"user deleted"});

        } catch (error) {
            next(error);
        }
    },

    patch_users_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Users.findByIdAndUpdate(req.params.userId,req.body);

            //send token
            res.status(204).json({message:"user field updated"});

        } catch (error) {
            next(error);
        }
    },








    get_users_address: async(req,res,next) => {
        try {
            const result = await Users.findById(req.params.userId);
            res.status(200).json({data:result.address,links:[
                {
                    "href":url+"/users/"+req.params.userId+"/address",
                    "method":"POST",
                    "rel":"Add-address-to-user's-list-of-addresses"
                },
                {
                    "href":url+"/users/"+req.params.userId+"/address/<address ID>",
                    "method":"GET",
                    "rel":"GET-a-particular-address-of-a-user"
                }
            ]});
        } catch (error) {
            next(error);
        }
    },

    post_users_address: async(req,res,next) => {
        
        try {
            //check if user exist with the given role
            const user = await Users.findById(req.params.userId);
            
            var address_arr = [...user.address,req.body];
            console.log(address_arr);

            await Users.findByIdAndUpdate(req.params.userId,{address:address_arr});

            //send token
            res.status(204).json({message:"user address added"});

        } catch (error) {
            next(error);
        }

    },


    
    get_users_address_id: async(req,res,next) => {
        try {
            const result = await Users.findById(req.params.userId);
            const addr = result.address.find((element) => {return element.id==req.params.addressId});
            res.status(200).json({data:addr,links:[
                {
                    "href":url+"/users/"+req.params.userId+"/address/"+req.params.addressId,
                    "method":"PUT",
                    "rel":"update-a-particular-address-of-a-user"
                },
                {
                    "href":url+"/users/"+req.params.userId+"/address/"+req.params.addressId,
                    "method":"PATCH",
                    "rel":"update-a-field-of-a-particular-address-of-a-user"
                },
                {
                    "href":url+"/users/"+req.params.userId+"/address/"+req.params.addressId,
                    "method":"DELETE",
                    "rel":"Delete-a-particular-address-of-a-user"
                },
            ]});
        } catch (error) {
            next(error);
        }
    },

    put_users_address_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            const result = await Users.findOneAndUpdate({'address._id':req.params.addressId},{'$set':{
                'address.$.address':req.body.address,
                'address.$.state':req.body.state,
                'address.$.city':req.body.city,
                'address.$.pincode':req.body.pincode,
            }});

            console.log(result);
            

            //send token
            res.status(204).json({message:"address updated"});

        } catch (error) {
            next(error);
        }

    },

    delete_users_address_id: async(req,res,next) => {

        try {
            //check if user exist with the given role
            await Users.findByIdAndUpdate(req.params.userId,{'$pull':{
                'address': {_id:req.params.addressId},
            }});

            //send token
            res.status(204).json({message:"address updated"});

        } catch (error) {
            next(error);
        }

    },

    patch_users_address_id: async(req,res,next) => {

        try {
            
            const result = await Users.findById(req.params.userId);
            const addr = result.address.find((element) => {return element.id==req.params.addressId});

            var address = (req.body.address!==undefined)?req.body.address:addr.address;
            var state = (req.body.state!==undefined)?req.body.state:addr.state;
            var city = (req.body.city!==undefined)?req.body.city:addr.city;
            var pincode = (req.body.pincode!==undefined)?req.body.pincode:addr.pincode;
            

            await Users.findOneAndUpdate({'address._id':req.params.addressId},{'$set':{
                'address.$.address':address,
                'address.$.state':state,
                'address.$.city':city,
                'address.$.pincode':pincode,
            }});

            

            //send token
            res.status(204).json({message:"address updated"});

        } catch (error) {
            next(error);
        }
    },


}
