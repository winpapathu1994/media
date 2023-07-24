const mongoose = require('mongoose');
const {Schema} = mongoose;

const PostSchema = new Schema({
    user:{type:Schema.Types.ObjectId, required:true,ref:"user"},
    category:{type:Schema.Types.ObjectId, required:true,ref:"category"},
    image:{type:String, required:true},
    title:{type:String, required:true},
    desc:{type:String, required:true},
    create:{type:Date, default: Date.now}
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;