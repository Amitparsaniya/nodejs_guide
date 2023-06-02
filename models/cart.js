// const Sequelize = require('sequelize')

// const sql =require("../utils/database")

// const cart =sql.define('cart',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true,
//     }
// })

// module.exports =cart



























// const fs =require('fs')
// const path =require("path")

// const p =path.join(path.dirname("nodejs_guide"),"data","cart.json")



// module.exports = class cart {
//    static addproduct(id,productprice){
//     // fetch the privous cart
//      let cart = { products:[] , totalprice:0 }
//     fs.readFile(p,(err,fileData)=>{
//       if(!err){
//          cart = JSON.parse(fileData)
//         }
//         // Analyze the cart => find the existing product
//         const existingproductIndex = cart.products.findIndex(p=> p.id===id)
//         console.log(existingproductIndex);
//         const existingproduct = cart.products[existingproductIndex]
//         let updatedproduct
//         if(existingproduct){
//                updatedproduct ={...existingproduct}
//                // add new product /increase the quantity
//                updatedproduct.qty = updatedproduct.qty + 1
//                cart.products = [...cart.products]
//                cart.products[existingproductIndex]= updatedproduct
//         }else{
//             updatedproduct = {id: id ,qty: 1}
//             cart.products = [...cart.products,updatedproduct]
//         }
//         // + + use before bcs convrt productprice string to number
//         cart.totalprice = cart.totalprice + +productprice
//         fs.writeFile(p,JSON.stringify(cart),err=>{
//             console.log(err);
//         })
//     })
        
//    }

//    static  deleteProduct(id,productprice){
//     console.log(id + "iiii");
//     try{

//         fs.readFile(p,(err,fileData)=>{
//             if(err){
//                 return []
//             }
//             const updatedCart = {...JSON.parse(fileData)}
//             const  product =  updatedCart.products.find(prod=>prod.id===id)
//             const produtqty= product?.qty
//             updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id)
            
//             updatedCart.totalprice =  updatedCart.totalprice -productprice* produtqty
            
//             fs.writeFile(p,JSON.stringify(updatedCart),err=>{
//                 console.log(/e/,err);
//             }
//             )
//         })
//     }catch(e){
//         console.log(e);
//     }
//   }

//   static getCartProducts(){
//     const file = JSON.parse(fs.readFileSync(p))
//      return file
//   }
// }