const DB = require('../dbs/post');
const Helper = require('../utils/helpers');

const allPost = async(req,res,next) => {
    let posts = await DB.find().populate('user category','-password -__v');
    Helper.fMsg(res, "All Posts", posts);
   // res.json({msg:"all Post"});
}
const getPost = async(req,res,next) => {
    let post = await DB.findById(req.params.id).populate('user category','-password -__v');
    if(post){
        Helper.fMsg(res, "Single Posts", post);
    }else{
       next(new Error('No Post with that id sir!'))
    }
    //res.json({msg:"get Post"});
}
const createPost = async(req,res,next) => {
    let userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    let result =  await new DB(req.body).save();
   // console.log('Req body user',req.body.user);
    //let createPost = new DB(req.body);
    //let result = await createPost.save();

    //let result = await new DB(req.body).save();
    Helper.fMsg(res, "Create Post", result);

   // res.json({msg:"create Post",result:req.body});
}
const editPost = async(req,res,next) => {
    let post = await DB.findById(req.params.id);
    if(post){
        await DB.findByIdAndUpdate(post._id, req.body);
        let result = await DB.findById(post._id);
        Helper.fMsg(res, 'Edit Post', result);
    }else{
        next(new Error("No post with that Id"));
    }
}
const deletePost = async(req,res,next) => {
    let post = await DB.findById(req.params.id);
    if(post){
        await DB.findByIdAndDelete(post._id);
        Helper.fMsg(res, 'Deleted Post');

    }else{
        next(new Error("No post with that Id"));
    }
    res.json({msg:"delete Post"});
}

const postByCategory = async(req,res,next) => {
    let posts = await DB.find({category:req.params.id});
    Helper.fMsg(res, 'All Posts by category', posts);
}

const postByUser = async(req,res,next) => {
    let posts = await DB.find({user:req.params.id}).populate('user');
    Helper.fMsg(res, 'All Posts by user', posts);
}

module.exports = {
allPost,
getPost,
createPost,
editPost,
deletePost,
postByCategory,
postByUser
}