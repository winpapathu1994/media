require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload =require('express-fileupload')
const path = require('path');
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json());
app.use(fileUpload())
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

const userRoute = require('./route/user');
const postRoute = require('./route/post');
const catRoute = require('./route/category');

app.use('/categories', catRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);

app.use((err,req,res,next) => {
    //console.log('error =====' , err)
    err.status = err.status || 200;
    res.status(err.status).json({
        cons:false,
        msg:err.message
    })
})
app.listen(process.env.PORT, console.log(`server is running at port ${process.env.PORT}`));