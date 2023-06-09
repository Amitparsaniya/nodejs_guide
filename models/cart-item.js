const Sequelize = require('sequelize')

const sql =require("../utils/database")

const cartItem =sql.define('cartItem',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    quantity: Sequelize.INTEGER
})

module.exports =cartItem