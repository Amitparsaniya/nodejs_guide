const Product =require("../models/product")
const {validationResult} =require("express-validator")
const { deletefile } = require("../utils/file")

// const mongodb =require("mongodb")


// const products = [];

// res.render("add-product",{pageTitle: 'Add Product'})
exports.getAddProduct =(req,res,next)=>{
    res.render("admin/edit-product",{
        pageTitle:"Add Product",
        path:"/admin/add-product",
        editing : false,
        hasError: false,
        isAuthenticated:req.session.isloggedIn,
        errorMessage:''
    })
}

exports.postAddProduct =(req,res,next)=>{
    try{
        const {title,price,description} =req.body
        const image = req.file
        console.log(/img/,image);
         console.log(title,price,description);
         const errors = validationResult(req)
        //  console.log(errors);
        if(!image){
            return  res.render("admin/edit-product",{
                pageTitle:"Add Product",
                editing: false,
                hasError: true,
                product:{
                    title:title,
                    price:price,
                    description:description,
                },
                errorMessage: 'Attached file is not an image!!',
            })
        }
        
        if(!errors.isEmpty()){
            return  res.render("admin/edit-product",{
                pageTitle:"Add Product",
                editing: false,
                hasError: true,
                product:{
                    title:title,
                    price:price,
                    description:description,
                    imageurl:image,
                },
                errorMessage: errors.array()[0].msg,
            })
        }

        const imageUrl = image.path
        const product = new Product({
            title:title,
            price:price,
            description:description,
            imageurl:imageUrl,
            userId: req.user._id
        })        
        product.save()
        res.redirect("/")
    }catch(e){
        console.log(e)
        const error =new Error(e)
        return next(error)
    }

    

  
}

exports.getEditProduct = async(req,res,next)=>{
    const EditMode =req.query.edit
    if(!EditMode){
       return res.redirect("/")
    }
    const Id = await req.params.productId
    const prodcut = await Product.findById(Id)
        
        res.render("admin/edit-product",{
            pageTitle:"Edit Product",
            path:"/admin/edit-product",
            editing: EditMode,
            product:prodcut,
            hasError:false,
            isAuthenticated:req.session.isloggedIn,
            errorMessage:''
        })
    // console.log(Id);
    // const  product  = await Product.findById(Id)
    // console.log(product);
    // if(!product){
    // //    return res.redirect("/")
    // }
}

exports.getProducts =async(req,res,next)=>{

    const data  = await Product.find()
        res.render("admin/products",{
            prods:data,
            isAuthenticated:req.session.isloggedIn
        })
//    const p = await Product.fetchAll()
// //    console.log(p);
    
}
exports.getAdminProducts =async(req,res,next)=>{
    const data  = await Product.find().populate("userId")
    // console.log(/data/,data);

        res.render("admin/products",{
            prods:data,
            isAuthenticated:req.session.isloggedIn,
        })
//    const p=await Product.fetchAll()
// //    console.log(p);
//        res.render("admin/products",{
//            prods:p,
//    })
}

exports.postEditProduct = async (req,res,next)=>{
    try{

        
        const updatedId = req.body.productId
        const updatedTitle =req.body.title
        const image =req.file
        const updatedprice =req.body.price
        const updateddescription =req.body.description
        
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return  res.render("admin/edit-product",{
                pageTitle:"Add Product",
                editing: true,
                hasError: true,
                product:{
                    title:updatedTitle,
                    price:updatedprice,
                    description:updateddescription,
                    // imageurl:updatedimageUrl,
                },
                errorMessage: errors.array()[0].msg,
            })
        }
        
        const prodcut = await Product.findById(updatedId.toString())
        
        prodcut.title= updatedTitle
        prodcut.price= updatedprice
        prodcut.description= updateddescription
        if(image){
            deletefile(prodcut.imageurl)
            prodcut.imageurl= image.path
            console.log('save');
        }
        
        
        prodcut.save()
        
        res.redirect("/product")
    }catch(err){
        console.log(err);
        const error = new Error(err)
        err.httpStatusCode=500
        return next(error)
    }
        
            

    //    const updatedproduct = new Product(updatedId,updatedTitle,updatedimageUrl,updatedprice,updateddescription)
        //  updatedproduct.save()
        // console.log(/product/+updatedprodu1ct);
        
        // res.redirect("/products")
    // }catch(e){
    //     console.log(e);
    // }
   
}

exports.postDeleteProduct = async(req,res,next)=>{
    try{

        const Id  = req.body.productId
        const prodccut = await Product.findById(Id)
        if(!prodccut){
            return next(new Error("product not found!"))
        }
        deletefile(prodccut.imageurl)
        const product = await  Product.findByIdAndRemove(Id)
        console.log(/pro/,product);
        res.redirect("/product")
    }catch(e){
        console.log(e);
    }
      
    //   .then(product=>{
    //     return product.destroy()
    //   })
    //   .then((prodcut)=>{
    //       console.log("Destroy product!!");
        // })
    //   .catch((e)=>console.log(e))
}
// exports.home = (req,res)=>{
//    res.render("home")
// }