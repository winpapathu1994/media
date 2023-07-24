const Joi = require('joi');

module.exports = {
        RegisterSchema :Joi.object({
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            phone:Joi.string().min(8).max(11).required(),
            password:Joi.string().min(8).max(25).required()
        }),
        PostSchema:Joi.object({
            category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            user: Joi.optional(),
            image:Joi.string().required(),
            title:Joi.string().required(),
            desc:Joi.string().required()
        }),
        AddCategory : Joi.object({
            name:Joi.string().required(),
            image:Joi.string().required()
        }),
        AllCategory:{
        id:Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        image:Joi.object({
            image: Joi.string().required()
        })
       }
    }