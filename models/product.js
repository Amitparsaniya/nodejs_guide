const mongoose =require("mongoose")

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageurl:{
        type: String|| File || Object
        // required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
})

const Prodcut = mongoose.model("Product",productSchema)

module.exports =Prodcut








// -------------- model using monogdb------------
// const mongodb= require("mongodb")
// const getdb = require("../utils/database").getdb

//  class Prodcut{
//     constructor(title,price,description,imageurl,id,userId){
//         this.title =title
//         this.price =price
//         this.description =description
//         this.imageurl =imageurl
//         this._id =id?  new mongodb.ObjectId(id) :null
//         this.userId = userId

//     }
//     async save(){
//         try{

//             const db =getdb()
//             let dboperation
//             if(this._id){
//                 dboperation = await db.collection('products').updateOne({_id:this._id},{$set:this})
//                 console.log(/data/,dboperation);
//             }
//             const data =    db.collection('products')
//             dboperation=  await data.insertOne(this)
//         }catch(e){
//             console.log(e);
//         }
//     }
//     static  fecthAll(){
//         try{
//             const db =getdb()
//             return db.collection('products').find().toArray()
//         }catch(e){
//             console.log(e);
//         }
//     }

//     static async findById(Id){
//         try{
//             const db =getdb()
//             const data =  await db.collection('products').findOne({_id:new mongodb.ObjectId(Id)})
//             console.log(/data/,data);
//             return data
                
//         }catch(e){
//             console.log(e)
//         }
//     }
//     static async deleteById(Id){
//         try{  
//             const db =getdb()
//             const data = await   db.collection('products').deleteOne({_id:new mongodb.ObjectId(Id)})
//             console.log(/delete/,data);
//             return data

//         }catch(e){
//             console.log(e);
//         }
//     }

// }

// module.exports = Prodcut


// ------------model using sequelize------------------
// const Product = sql.define("product",{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true,
//     },
//     title:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     price:{
//         type:Sequelize.DOUBLE,
//         allowNull:false
//     },
//     imageurl:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports = Product


























//  ----------model using  sql--------------
// const path =require("path")
// const db= require('../utils/database')
// const fs =require('fs')
// const Cart = require("./cart")

// const p =path.join(path.dirname("nodejs_guide"),"data","products.json")

// const getProductsFromFile = () =>{
//         const file = JSON.parse(fs.readFileSync(p))

//         return file
// }

// module.exports = class Product {
//     constructor(id,title,imageUrl,price,description){
//         this.id=id
//         this.title =title,
//         this.imageUrl =imageUrl,
//         this.price = price,
//         this.description =description
//     }
//     save(){
//        return db.execute('INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)',
//       [this.title,this.price,this.imageUrl,this.description])
//     }
    //     const data =  getProductsFromFile()
    //     if(this.id){
    //         // const product =  data.find(prod=>prod.id===data.id)
    //         // console.log(product);
    //             const existingproductIndex = data.findIndex(prod=>prod.id===this.id)
    //             const updatedproduct =[...data]
    //             updatedproduct[existingproductIndex] =this
    //             fs.writeFile(p,JSON.stringify(updatedproduct),(err)=>{
    //                 console.log(err);
    //             })
            // }else{

            //     this.id = Math.random().toString()
            //     data.push(this)
            //     fs.writeFile(p,JSON.stringify(data),(err)=>{
            //         console.log(err);
            //     })
                
            // }
        
      
        // }

    // static async deleteByyId(id){
    //     const data = await getProductsFromFile()
    //     if(!data){
    //         return ;
    //     }
    //     const prodcut =  data.find(p=>p.id===id)
    //     const newproduct = data.filter(prod=>prod.id !== id)
    //     fs.writeFile(p,JSON.stringify(newproduct),err=>{
    //         console.log(/err/,err);
    //         if(!err){
    //             console.log("fire");
    //             Cart.deleteProduct(id,prodcut.price)
    //             console.log(/id/,id);
    //         }
    //     })
    // }

//     static fetchAll(){
//        return db.execute('SELECT * FROM products')
//     }

//     static async findById(id){
//         return db.execute('SELECT * FROM products WHERE products.id = ?',[id])

//     // const data = await getProductsFromFile()
     
//     //     const product = data.find( p => p.id === id)
//     //     return product
//     }

// }

