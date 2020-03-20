const joi =  require('joi');


module.exports = {
    validate_body_login: (schema) => {
        return (req,res,next) => {
            const result = joi.validate(req.body,schema);
            if(result.error){
                console.log(result);
                
                return res.status(400).json(res.error);
            }
            if(!req.value){req.value={};}
            req.value['body'] = result.value;
            next();
        }
    },

    schemas_login:{
        auth_schema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
        }),
    }
}