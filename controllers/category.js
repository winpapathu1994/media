const DB = require('../dbs/category');
const Helper = require('../utils/helpers');

const allCategory = async(req,res,next) => {
    let categories = await DB.find();
    Helper.fMsg(res, "All categories", categories);
    //res.json({msg:"all category"});
}
const getCategory = async(req,res,next) => {
    let category = await DB.findById(req.params.id)
   // console.log('category', category);
    if(category){
        Helper.fMsg(res, "Category Detail", category);
    }else{
       next(new Error('No category with that id sir!'))
    }
}
const createCategory = async(req,res,next)=>{
    let findCategory = await DB.findOne({name:req.body.name});
    if(findCategory){
        next(new Error("Category Name is already used"))
    }else{
    let saveCategory = new DB(req.body);
    let result = await saveCategory.save();
    Helper.fMsg(res, "Create Category", result);
}
}

const editCategory = async (req,res,next) => {
    let category = await DB.findById(req.params.id);
    if (category){
        await DB.findByIdAndUpdate(category._id, req.body);
        let result = await DB.findById(req.params.id);
        //validate for file
        //let result = await DB.findById(category._id);
        Helper.fMsg(res, "Category Updated", result);
    }else{
        next(new Error("No category with that ID"));
    }
}


const deleteCategory = async (req,res,next) => {

    let category = await DB.findById(req.params.id);
    if (category){
        await DB.findByIdAndDelete(category._id);
        Helper.fMsg(res, "Category Deleted");
    }else{
        next(new Error("No category to delete with that ID"));
    }
  
}

module.exports = {
    allCategory,
    getCategory,
    createCategory,
    editCategory,
    deleteCategory
 }