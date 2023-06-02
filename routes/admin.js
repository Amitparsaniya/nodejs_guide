const express =require("express")
const { getAddProduct, postAddProduct, getProducts, getAdminProducts, getEditProduct, postEditProduct, postDeleteProduct } = require("../controllers/admin")
const { isAuth } = require("../middleware/is_auth")
const {check} =require('express-validator')



const adminroute =express.Router()


adminroute.get("/add-product",isAuth,getAddProduct)
adminroute.get("/products",isAuth,getProducts)

adminroute.post("/admin/add-product",isAuth,
[check('title').trim().not().isEmpty().withMessage('Title is missing!!').isLength({min:4,max:20}).withMessage("Title must be 4 to 20 charactors long!"),
// check('imageUrl').trim().not().isEmpty().withMessage('imageurl is missing!!').isURL().withMessage("image have to be in url format!!"),
check('price').trim().not().isEmpty().withMessage('price is missing!'),
check('description').trim().not().isEmpty().withMessage('description is missing!').isLength({min:8,max:100}).withMessage("description must be 8 to 100 charactors long!"),
]
,postAddProduct)
adminroute.get("/Admin-Product",isAuth,getAdminProducts)
adminroute.get("/edit-Product/:productId",isAuth,getEditProduct)
adminroute.post("/admin/edit-Product",isAuth,
[check('title').trim().not().isEmpty().withMessage('Title is missing!!').isLength({min:4,max:20}).withMessage("Title must be 4 to 20 charactors long!"),
// check('imageUrl').trim().not().isEmpty().withMessage('imageurl is missing!!').isURL().withMessage("image have to be in url format!!"),
check('price').trim().not().isEmpty().withMessage('price is missing!'),
check('description').trim().not().isEmpty().withMessage('description is missing!').isLength({min:8,max:100}).withMessage("description must be 8 to 100 charactors long!")]
,postEditProduct)
adminroute.post("/admin/delete-Product",isAuth,postDeleteProduct)




module.exports =adminroute
