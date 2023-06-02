const mongoose =require("mongoose")
const bcrypt =require('bcrypt')

const UserSchema = new mongoose.Schema({
   email:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   },
   resetToken : String,
   resetTokenExpiration: Date,
   cart:{
     items:[{
        productid:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
        quantity:{type:Number,required:true}
   }]
   }
})

UserSchema.methods.addToCart =function(product){
   const user = this
   const cartproductIndex =  user.cart.items.findIndex(cp=>{
      return cp.productid.toString() === product._id.toString()
   })
   console.log(cartproductIndex);
   let newquantity =1
   const updatedcartItem =[...user.cart.items] 
   console.log(/prvsitem/,updatedcartItem);

   if(cartproductIndex >=0){
      newquantity =user.cart.items[cartproductIndex].quantity +1
      updatedcartItem[cartproductIndex].quantity =newquantity
   }
   else{
      updatedcartItem.push({
         productid: product._id,
         quantity : newquantity
      })         
   }

   const  updatedcart ={
       items : updatedcartItem
    }

    user.cart = updatedcart
    return user.save()

}

UserSchema.methods.comparepassword = async function(password){
   const user =this
   const result  = await bcrypt.compare(password,user.password)
   return result
}

UserSchema.pre('save', async function(next){
   const user =this
   if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password,10)
   }
   next()
})

UserSchema.methods.removefromcart = async function(prodcutid){
   const user =this
   const  productarray= await user.cart.items
   // console.log(/aaa/,productarray);
      const updatedcartItem =  productarray.filter(p=>{
         // console.log(/id/,p.prodcutid.toString());
         return p.productid.toString() != prodcutid.toString()
      })
      // console.log(/itemm/,updatedcartItem);
   user.cart.items =updatedcartItem
   return await user.save()
}

UserSchema.methods.clearCart = async function(){
   const user= this
   user.cart= { items:[]}
    return await user.save()
}
const User = mongoose.model("User",UserSchema)

module.exports =User














// -----------model for mogodb------------
// const mongodb =require("mongodb")
// const getdb = require("../utils/database").getdb

// class User{
//    constructor(name,email,cart,id){
//       this.name =name
//       this.email = email
//       this.cart =cart ||{items: []}
//       this._id =id
//    }
   
//    save(){
//       const db = getdb()
//          return  db.collection("Users").insertOne(this)
//    }

//    addTocart(product){
   
//       console.log(/addtocart/,this.cart.items);
//       const cartproductIndex= this.cart.items.findIndex(cp=>{
//          // console.log(/ppp/,product);
//          // console.log(/cpid/,cp.productid);
//          // console.log(/aaaaid/,product._id);

//         return cp.productid.toString() === product._id.toString()
//       })
//       // console.log(product._id);
//       // console.log(/chexvk/,cartproductIndex);
//       let newquantity =1
//       const updatedcartItem =[...this.cart.items]

//       if(cartproductIndex >= 0){
//          newquantity = this.cart.items[cartproductIndex].quantity + 1
//          updatedcartItem[cartproductIndex].quantity =newquantity
      
//       }else{
//          updatedcartItem.push({
//             productid:  new mongodb.ObjectId(product._id),
//             quantity:newquantity
//          })
//       }
      

//       const updatedcart = {items:updatedcartItem}
//       const db = getdb()
//       return db.collection("Users").updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updatedcart}})

//    }

//    static async findById(Id){
//       try{ 
//          const db = getdb()
         
//          const data = await db.collection("Users").findOne({_id: new mongodb.ObjectId(Id)})
//          return data 
//       }catch(e){
//          console.log(e);
//       }

//    }
//       getCart(){
//        const db= getdb()
//      const   productsids  =   this.cart.items.map(i=>i.productid)
//      console.log(productsids);

//      const prodcuts =   db.collection("products").find({id:{$in:[productsids]}}).toArray()


//      const cartproduct = prodcuts.map(p=>{
//        return {...p,
//             quantity: this.cart.items.find(i=>{
//                return i.productid.toString()=== p._id.toString()
//             }).quantity
//       }

//      })
//      return cartproduct

//    }
  
// }
// module.exports = User






// ------------modal for sequelize------------
// const Sequelize =require('sequelize')

// const sql = require("../utils/database")

// const user = sql.define('user',{
//    id:{
//     type:Sequelize.INTEGER,
//     autoIncrement:true,
//     allowNull:false,
//     primaryKey:true,
//    },
//    name:{
//     type:Sequelize.STRING,
//     allowNull:false,
//    },
//    email:{
//     type:Sequelize.STRING,
//     allowNull:false,
 
//    }
// })


// module.exports =user