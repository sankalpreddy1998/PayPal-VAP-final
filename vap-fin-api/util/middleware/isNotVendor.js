module.exports = {

    isNotVendor: async(req,res,next)=>{
        try{

            //check if the user has an vendor role
            if(req.user.role!=="vendor")
                next();
            else
                res.status(401).json({message:"Unauthorized"});

        }catch(error) {
            next(error);
        }
    },
    
}