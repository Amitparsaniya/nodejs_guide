const mongoose = require('mongoose')

const OredrSchema = new mongoose.Schema({
    products:[
        {
            product:{ type: Object,required:true},
            quantity:{ type: Number,required: true}
        }
    ],
     user:{
        email:{
            type:String,
            required: true
        },
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
     }
})

const Order = mongoose.model("Order",OredrSchema)

module.exports =Order


// ---------- order model using Sequelize----------
// const Sequelize = require('sequelize')

// const sql =require("../utils/database")

// const order =sql.define('order',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true,
//     }
// })

// module.exports =order
