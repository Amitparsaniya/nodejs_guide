const mongose =require('mongoose');

// let _db

mongose.connect("mongodb+srv://root:root@cluster0.rjtyl8j.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("DB connected successfully!!!")
    // _db =client.db()
}).catch((err)=>{
  console.log(err);
//   const error =  new Error(err)
//   console.log(/err/,errror);
//   error.httpStatusCode=500
//    return next(error)
})




// exports.getdb =()=>{
//     if(_db) return _db
//     throw "no database found!!"
// }


// ---------for sql database connextion--------
// const { Sequelize } = require("sequelize")
// const Sequelize=require("sequelize")


// const sql = new Sequelize("node-complete","root","root",{
//     dialect:"mysql",
//     host:"localhost"
// })

// module.exports =sql

// const mysql =require('mysql2')

// const pool = mysql.createPool({
//     host:"localhost",
//     user:"root",
//     database:"node-complete",
//     password:"root"
// })

// module.exports =pool.promise()