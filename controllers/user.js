const DB = require('../dbs/user');
const Helper = require('../utils/helpers');

const login = async(req,res,next) => {
    let phoneUser = await DB.findOne({phone:req.body.phone}).select("-__v");
    if(phoneUser){
        if(Helper.comparePassword(req.body.password, phoneUser.password))
        {
            let user = phoneUser.toObject();
            //not show password
            delete user.password;
            user.token = Helper.makeToken(user);
            console.log('token', user)
            Helper.fMsg(res,"Login Successfully", user);
        }else{
            next(new Error('Creditial Error'))
        }

    }else{

    }
    Helper.fMsg(res, "Login Success", req.body);
}
const register = async(req,res,next) => {
    let oldName = await DB.findOne({name:req.body.name});
    if(oldName){
        next(new Error('Name is already use'));
        return;
    }
    let oldEmail = await DB.findOne({email:req.body.email});
    if(oldEmail){
        next(new Error('Email is already use'));
        return;
    }
    let oldPhone = await DB.findOne({phone:req.body.phone});
    if(oldPhone){
        next(new Error('Phone is already use'));
        return;
    }
    req.body.password = Helper.encode(req.body.password);
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Register Success", result);
}

module.exports = {
    login,
    register
}