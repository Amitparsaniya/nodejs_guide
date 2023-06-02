const fs =require('fs')
const path =require('path')
const pdfdocument =require('pdfkit')
const stripe =require('stripe')("sk_test_51MskCSSEF7UYwpSu6A7cL7lmasRPXys4NLIdsSymkZmoP8GFjtAAjh78SAt1oBxoYCuoTESlJPM3pE077AgDj1Nn00DfbiETnj")
const Product =require("../models/product")
const Sequelize =require('sequelize')
const Cart  =require("../models/cart")
const User = require("../models/user")
const Order =require("../models/order")
const { constants } = require('buffer')

const item_per_page = 1

exports.getProducts = async(req,res,next)=>{
    try{
        page = +req.query.page ||1
        let totalItmes ;
        const Numofproduct = await Product.find().count()
        totalItmes =Numofproduct
        // console.log(/p/,totalItmes);
        // console.log(page);
        const data  = await Product.find().skip((page-1) * item_per_page).limit(item_per_page)
        // console.log(data);
            res.render("shop/product-list",{
                prods:data,
                isAuthenticated: req.session.isloggedIn,
                currentPage :page,
                totalProducts: totalItmes,
                hasNextPAge: item_per_page*page< totalItmes,
                hasPreviousPage: page>1,
                nextPage: page +1,
                previousPage: page -1,
                lastpage: Math.ceil(totalItmes/item_per_page)
            })
    }catch(e){
        console.log(e);
    }
}
exports.getProduct = async(req,res,next)=>{
       
    try{
        const Id =  req.params.productId
        const prodcut = await Product.findById(Id)
        // console.log(prodcut[0].title);
        res.render("shop/product-detail",
        {pageTitle:prodcut.title,
         product:prodcut,
         isAuthenticated:req.session.isloggedIn
        })
    }catch(e){
        console.log(e);
    }



// With Sequelize(npm package)v5 apparently findById has been replaced by findByPk.
//    Product.findByPk(Id)
//    .then((product)=>{
//    }).catch((e)=>{console.log(e)})

//  console.log(/prodcut/, prodcut);

}

exports.getIndex=  async(req,res,next)=>{
    const page = +req.query.page ||1
    let totalItmes ;
    const Numofproduct = await Product.find().count()
    totalItmes =Numofproduct
    // console.log(/p/,totalItmes);
    // console.log(page);
    const data  = await Product.find().skip((page-1) * item_per_page).limit(item_per_page)
    // console.log(data);
        res.render("shop/index",{
            prods:data,
            isAuthenticated: req.session.isloggedIn,
            currentPage :page,
            totalProducts: totalItmes,
            hasNextPAge: item_per_page*page< totalItmes,
            hasPreviousPage: page>1,
            nextPage: page +1,
            previousPage: page -1,
            lastpage: Math.ceil(totalItmes/item_per_page)
        })
}

exports.getcart= async (req,res,next)=>{
     try{
         const cartproducts = await req.user.populate('cart.items.productid')
         const cartproduct =cartproducts.cart.items
         console.log(/getcart/,cartproduct);
         res.render("shop/cart",{
             pageTitle:"Your Cart",
             prods:cartproduct,
             isAuthenticated:req.session.isloggedIn
            })
        }catch(e){
            console.log(e);
        }
}
            
    // req.user.getCart()
    // .then(cart=>{
    //     console.log(/cart/,cart);
    //   return cart.getProducts()
    //   .then((products)=>{
    //     console.log(products);
    //   }).catch(e=>console.log(e))
// }
//      const cartproduct=  await Cart.getCartProducts()
//      const productdata  = await Product.fetchAll()

//      const prodcuts = productdata.filter(p=>p.id!==cartproduct.id)
//      console.log(/data/,prodcuts);
   
//     res.render("shop/cart",{
//         pageTitle:"Your Cart",
//         prods:prodcuts,
//         })
// }
exports.postcart= async (req,res,next)=>{
    const productId = req.body.productId
    console.log(/id/,productId);
 
     const  prodcut = await Product.findById(productId)
              console.log(/product/,prodcut);
        const userproduct = await req.user?.addToCart(prodcut)
        console.log(/userpro/,userproduct);
        res.redirect('/cart')
        

    // let fetchedcart;
    // let newquantity =1
    // //  fetch product from the cart by productId
    // req.user.getCart()
    // .then(cart=>{
    //     fetchedcart=cart
    //     return cart.getProducts({where:{id:productId}})
    // })
    // .then(products=>{
    //     // console.log(/pro/,products[0]);
    //     let prodcut
    //     if(products.length>0){
    //         prodcut= products[0]
    //         // console.log(/product/,prodcut);
    //     }
    //     if(prodcut){
    //         const oldquantity =prodcut.cartItem.quantity
    //         // console.log(/quantity/,oldquantity);
    //         newquantity= oldquantity +1
    //         // console.log(/product/,prodcut);
    //         return prodcut
    //     }
    //     return Product.findByPk(productId)
    // })
    // // if product doesn't exsist then addproduct with newquantity
    // .then(prodcut=>{
    //     return fetchedcart.addProduct(prodcut,{
    //         through:{quantity:newquantity}
    //     })
    // })
    // .then(()=>{
    // })
    // .catch(e=>console.log(e))

//    const data= await Product.findById(productId)
//    console.log(data);
//         Cart.addproduct(productId,data.price)
    
//     console.log(productId);
//     console.log(data.price);
//     console.log(productId);
//     res.render("shop/cart")
}
exports.postCardDeleteItem =(req,res,next)=>{
    const prodId = req.body.productId
       req.user.removefromcart(prodId)
        res.redirect('/cart')
    // .then(cart=>{
    //     return cart.getProducts({where:{id:prodId}})
    //     // return cart.getProducts({where:{id:productId}})
        
    // })
    // .then(products=>{
    //     const product = products[0]
    //     return product.cartItem.destroy()
    // })
    // .then(result=>{
    // })
    // .catch(e=>console.log(e))
    
    // const data =  Product.findById(prodId)
    // Cart.deleteProduct(prodId,data.price)
    // console.log(/data/,data);
    
}
exports.getCheckOut = async(req,res,next)=>{
    try{
    let total =0
    let  cartproduct
    const cartproducts = await req.user.populate('cart.items.productid')
     cartproduct =cartproducts.cart.items
    // console.log(/getcart/,cartproduct);
    cartproduct.forEach(p=>{
        total = total + p.quantity * p.productid.price
    })

    const session = await stripe.checkout.sessions.create({
        line_items:cartproduct.map(p=>{
            return {
            // name : p.productid.title,
            // description: p.productid.description,
            // amount: p.productid.price*100,
            // currency: 'usd',
            // quantity: p.quantity

            price_data: {
              currency: 'usd',
              unit_amount: p.productid.price*100,
              product_data: {
                name: p.productid.title,
                description: p.productid.description,
              },
            },
            quantity: p.quantity
        }
        }),
        mode:'payment',
        success_url : req.protocol +"://" + req.get('host') + '/checkout/success',
        cancel_url : req.protocol +"://" + req.get('host') + '/checkout/cancel'

    })
    // console.log(/total/,session);
    // console.log(/total/,session.id);

    res.render("shop/checkout",{ 
        pageTitle:"checkout",
        // path:"/checkout",
        prods:cartproduct,
        isAuthenticated:req.session.isloggedIn,
        totalsum:total,
        sessionId:session.id
       })
   }catch(e){
       console.log(e);
   }

}
exports.postOrder = async(req,res,next)=>{
    const user = await req.user.populate('cart.items.productid')
    console.log(/cart/,user.items);
      const product = user.cart.items.map(i=>{
        return {quantity:i.quantity,product:{...i.productid._doc}}
      })
    
    console.log(/pp/,product);

   const order =new Order({
    user:{
        email: req.user.email,
        userid: req.user
    },
    products: product
})
        await order.save()
          req.user.clearCart()
        res.redirect("/order")
//     let fetchedcart;

//  req.user
//   .getCart()
//   .then(cart=>{
//       fetchedcart = cart
//       return cart.getProducts()
//     })
//     .then(products=>{
//         return req.user.createOrder()
//         .then(order=>{
//             console.log(/pppp/,order)
//             order.addProduct(
//                 products.map(product=>{
//                     product.orderItem = {quantity:product.cartItem.quantity}
//                     return product
//                 })
//                 )
                   
//     })  .catch(e=>console.log(e))
//     .then(result=>{
//         // used for clear or remove cart table
//         return fetchedcart?.setProduct(null)
//     }).then(result=>{
//     })
// })

// .catch(e=>console.log(e))
}

exports.getorder= async(req,res,next)=>{
    const order= await Order.find({'user.userid':req.user?._id})
    // console.log(/order/,order[0].products[0].product.title);
    res.render("shop/Orders",{
        pageTitle:"Your order",
        prods:order,
        isAuthenticated:req.session.isloggedIn
    })
    
    
    // req.user.getOrders({include:['products']})
    // req.user.getorder()
    // .then(orders=>{
    // console.log(/order/,orders);   // return orders.getProducts()
        
    // })
    // .catch(e=>console.log(e))
}

exports.getInvoice = async(req,res,next)=>{
    try{
        const orderId =req.params.orderId
        const order = await Order.findById(orderId)
        console.log(/o/,order);
        if(!order){
            return next(new Error('no order found!'))
        }
        if(order.user.userid.toString() !== req.user._id.toString()){
            return next(new Error('unauthorized access!'))
        }
        console.log(/u/,req.user);
        const InvoiceName = 'invoice-'+ orderId + '.pdf'
        const InvoicePath =  path.join("data","Invoices",InvoiceName)

        const pdfdoc =new pdfdocument()
        res.setHeader('content-type','application/pdf')
        res.setHeader('content-Disposition','inline;filename="' + InvoiceName + '"')
        pdfdoc.pipe(fs.createWriteStream(InvoicePath))
        pdfdoc.pipe(res)

        pdfdoc.fontSize(18).text(`Invoice of your order Id # ${orderId}` ,{
            underline:true
        });
        let totalprice =0
        order.products.forEach(prods=>{
            totalprice = totalprice + prods.quantity* prods.product.price
            pdfdoc.fontSize(15).text(
              `Name:${prods.product.title},
               quantity: ${prods.quantity},
                price: $ ${prods.product.price},
                ------------------------
                grandtotal= $ ${totalprice}`

            )
        })
        pdfdoc.end()

        // fs.readFile(InvoicePath,'utf-8',(err,data)=>{
        //     if(err){
        //         console.log(/e/,err);
        //         return  next(err)
        //     }
        //     console.log(/d/,data);
        // })
        // const file =   fs.createReadStream(InvoicePath)
        // file.pipe(res)        
    }catch(e){
        console.log(e);
    }
}

// req.user.getCart()
// .then(cart=>{
//   return cart.getProducts()
//   .then((products)=>{
//     console.log(products);
//     res.render("shop/cart",{
//                 pageTitle:"Your Cart",
//                 prods:products,
//                 })
//         })
//   }).catch(e=>console.log(e))

// exports.checkout= (req,res,next)=>{
    // res.render("shop/check-out",{
        //         pageTitle:"Your Check-out"
    
    // })
// }