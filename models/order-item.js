const Sequelize = require('sequelize')

const sql =require("../utils/database")

const orderItem =sql.define('orderItem',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    quantity: Sequelize.INTEGER
})

module.exports =orderItem