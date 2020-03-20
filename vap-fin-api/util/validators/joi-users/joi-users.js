const joi =  require('joi');

var address_schema = joi.object().keys({
    address: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    pincode: joi.number().required(),
})

var address_schema_not_required = joi.object().keys({
    address: joi.string(),
    city: joi.string(),
    state: joi.string(),
    pincode: joi.number(),
})

module.exports = {
    validate_body_add_user: (schema) => {
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
    validate_address: (schema) => {
        return (req,res,next) => {
            
            const result = joi.validate(req.body.address,schema);
            if(result.error){
                console.log(req.body);
                
                return res.status(400).json(res.error);
            }
            if(!req.value){req.value={};}
            req.value['body'] = result.value;
            next();
        }
    },
    validate_address_only: (schema) => {
        return (req,res,next) => {
            
            const result = joi.validate(req.body,schema);
            if(result.error){
                console.log(req.body);
                
                return res.status(400).json(res.error);
            }
            if(!req.value){req.value={};}
            req.value['body'] = result.value;
            next();
        }
    },

    schemas_add_user:{
        auth_schema: joi.object().keys({
            name: joi.string(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            phone_no: joi.number().required(),
            role: joi.string(),
            address: joi.array().items(address_schema),
        }),
        patch_schema: joi.object().keys({
            name: joi.string(),
            email: joi.string().email(),
            password: joi.string(),
            phone_no: joi.number(),
            role: joi.string(),
            address: joi.array().items(address_schema),
        }),
        address_schema:address_schema,
        address_schema_not_required:address_schema_not_required,
        address_schema_array:joi.array().items(address_schema)
    }
}