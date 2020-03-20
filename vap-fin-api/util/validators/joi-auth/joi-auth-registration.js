const joi =  require('joi');

var address_schema = joi.object().keys({
    address: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    pincode: joi.number().required(),
})

module.exports = {
    validate_body_register: (schema) => {
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

    schemas_register:{
        auth_schema: joi.object().keys({
            name: joi.string(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            phone_no: joi.number().required(),
            address: joi.array().items(address_schema),
        }),
    }
}