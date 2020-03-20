module.exports = {

    isNotShipper: async(req,res,next)=>{
        try{

            //check if the user has an shipper role
            if(req.user.role!=="shipper")
                next();
            else
                res.status(401).json({message:"Unauthorized"});

        }catch(error) {
            next(error);
        }
    },
    
}