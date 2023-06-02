const express =require("express");
const {  getProducts, getIndex, getcart, getorder, getProduct, postcart, postCardDeleteItem, postOrder, getInvoice, getCheckOut } = require("../controllers/shop");
const { isAuth } = require("../middleware/is_auth");

const router = express.Router()
// console.log(router);


// router.get("/add-product",getAddProduct)
// router.post("/add-product",postAddProduct)
router.get("/",getIndex)
router.get("/product",isAuth,getProducts)
router.get("/product/:productId",isAuth,getProduct)
router.get("/cart",isAuth,getcart)

router.post("/cart",isAuth,postcart)

router.get("/checkout",isAuth,getCheckOut)
router.get("/checkout/success",postOrder)
router.get("/checkout/cancel", getCheckOut)


router.post("/create-order",isAuth,postOrder)
router.post("/cart-delete-item",isAuth,postCardDeleteItem)

router.get("/checkout/success",postOrder)
router.get("/checkout/cancel",getCheckOut)


router.get("/order",isAuth,getorder)

router.get('/order/:orderId',isAuth,getInvoice)


// router.get("/",)




module.exports =router
