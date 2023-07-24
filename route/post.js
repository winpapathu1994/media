const router = require('express').Router();
const controller = require('../controllers/post');
const {validateToken,validateBody} = require("../utils/validator");
const { PostSchema } = require("../utils/schema");
const { saveFile } = require("../utils/gallery");

//Fetch All Posts
router.get('/',controller.allPost)

//create new Post
router.post("/",validateToken,saveFile, validateBody(PostSchema), controller.createPost)

router.route("/:id")
.get(controller.getPost)
.patch(validateToken,controller.editPost)
.delete(validateToken,controller.deletePost)

//posts by category
router.get("/postbycat/:id", controller.postByCategory);
//posts by user
router.get("/postbyuser/:id", controller.postByUser)


module.exports = router;