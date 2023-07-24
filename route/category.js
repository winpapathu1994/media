const router = require('express').Router();
const controller = require('../controllers/category');
const { saveFile } = require('../utils/gallery');
const { AddCategory,AllCategory }= require('../utils/schema');
const { validateBody,validateParam } = require('../utils/validator');

router.get('/',controller.allCategory)
//create new category
router.post("/",[saveFile,validateBody(AddCategory), controller.createCategory])

router.route("/:id")
.get(validateParam(AllCategory.id,"id"),controller.getCategory)
.patch(validateParam(AllCategory.id,"id"),controller.editCategory)
.delete(validateParam(AllCategory.id,"id"),controller.deleteCategory)
//validate for file
//.patch([saveFile,validateBody(AllCategory.image),controller.editCategory])


module.exports = router;