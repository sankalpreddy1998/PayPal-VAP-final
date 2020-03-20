const joi =  require('joi');

module.exports={
    json_to_joi: (payload) => {
        console.log(payload);
        var joi_obj = {}
        for (var key in payload) {
            if(payload[key].type=="string"){
                if(payload[key].required==true){
                    joi_obj[key]=joi.string().required();
                }
                else{
                    joi_obj[key]=joi.string();
                }
            }
            if(payload[key].type=="number"){
                if(payload[key].required==true){
                    joi_obj[key]=joi.number().required();
                }
                else{
                    joi_obj[key]=joi.number();
                }
            }
        }

        return joi.object().keys(joi_obj);
    }
}