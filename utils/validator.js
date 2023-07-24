const jwt = require('jsonwebtoken');
const userDB = require("../dbs/user")
module.exports = {
    validateBody: (schema) => {
        return (req,res,next)=> {
        const result = schema.validate(req.body);
        if(result.error){
            let errMsg = result.error.details[0].message;
            next(new Error(errMsg));
        }else{
            next();
        }
        }
    },
    validateParam:(schema,name)=>{
        return (req,res,next) =>{
            //console.log('request', req.params)
            let obj = {};
            obj[`${name}`] = req.params[`${name}`];
            let result = schema.validate(obj);
            //console.log('result', result)
            if(result.error){
                next(new Error(result.error.details[0].message));
            }else{
                next();
            }
        }
    },
    validateToken: async (req,res,next) => {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let decode = jwt.decode(token, process.env.SECRET_KEY);
            let user = await userDB.findById(decode._id);
            if(user){
                req.body['user'] = user;
                next();

            }else{
                next(new Error('Token Error'));
            }
        }else{
            next(new Error('Token Error'));
        }
        
      
    }
}