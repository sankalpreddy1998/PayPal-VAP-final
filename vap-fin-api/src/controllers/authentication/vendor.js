const { JWT_SECRET } = require("../../../config/key");
const JWT = require("jsonwebtoken");
const User = require("../../models/user");

signToken = (user) =>{
    return JWT.sign({
        iss: 'sankalpreddy1998',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate( new Date().getDate() + 1)
    },JWT_SECRET)
}


module.exports = {


    vendor_signup: async(req,res,next)=>{
        try{

            //check if user exist with an admin role
            const foundUser = await User.findOne({email:req.body.email,role:"vendor"});
            if (foundUser) {
                return res.status(409).json({error:"account already exists",suggestion:"try logging in with password"});
            }


            //create new admin user
            var obj = req.body;
            obj.role="vendor";
            const rec = new User(obj);

            //save new user
            await rec.save();

            //sign token
            const token = signToken(rec);

            //send token
            res.status(201).json({message:"vendor registered",token:token});

        }catch(error) {
            next(error);
        }
    },



    vendor_signin: async(req,res,next)=>{
        try{
                        
            //check if user exist with an admin role
            const foundUser = await User.findOne({email:req.body.email,role:"vendor"});
            if (!foundUser) {
                return res.status(409).json({error:"Account does not exist",suggestion:"create a new account"});
            }
            if (req.body.password!==foundUser.password) {
                return res.status(409).json({error:"Password does not match",suggestion:"please retry with correct password"});
            }

            //sign token
            const token = signToken(foundUser);

            //send token
            res.status(200).json({message:"success",token:token});

        }catch(error) {
            next(error);
        }
    },

}