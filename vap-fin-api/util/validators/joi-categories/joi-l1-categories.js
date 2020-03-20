const joi =  require('joi');

module.exports = {
    validate_body: (schema) => {
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
    
    schemas_l1_category:{
        l1_category_schema: joi.object().keys({
            name: joi.string().required(),
            sub_categories: joi.array().required()
        }),
        l1_category_schema_nr: joi.object().keys({
            name: joi.string(),
            sub_categories: joi.array()
        }),
    }
}