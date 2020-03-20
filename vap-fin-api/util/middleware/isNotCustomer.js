module.exports = {

    isNotCustomer: async(req,res,next)=>{
        try{
            console.log(req.user.role);
            
            //check if the user has an customer role
            if(req.user.role!=="customer")
                next();
            else
                res.status(401).json({message:"Unauthorized"});

        }catch(error) {
            next(error);
        }
    },
    
}