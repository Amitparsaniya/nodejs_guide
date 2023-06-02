const express =require("express")
const {check} =require('express-validator')
const { getLogin, postlogin, postlogout, getsignup ,postsignup, getresetPassword, postReset, getNewpassword, psotNewPassword} = require("../controllers/auth")


const authroute =express.Router()


authroute.get("/login",getLogin)
authroute.post('/login',
[check('email').normalizeEmail().isEmail().withMessage('please enter a valid number!!'),
check('password').trim().not().isEmpty().withMessage("Password is Missing").isLength({min:5,max:12}).withMessage("Password must be 5 to 12 charactors long!")],postlogin)

authroute.post('/logout',postlogout)

authroute.get('/signup' ,getsignup)
authroute.post('/signup',
[check('email').normalizeEmail().isEmail().withMessage('please enter a valid number!!'),
check('password').trim().not().isEmpty().withMessage("Password is Missing").isLength({min:5,max:12}).withMessage("Password must be 5 to 12 charactors long!"),
check('confirmpassword').trim().not().isEmpty().withMessage(" confrimpassword Password is Missing").isLength({min:5,max:12}).withMessage("Password must be 5 to 12 charactors long!")]
// .custom((value,{req})=>{
//  if(value !== req.body.confirmpassword){
//     throw new Error("password have to match")
//  }
//  return true
// })]
,postsignup)


authroute.get('/reset', getresetPassword )
authroute.post("/reset",postReset)

authroute.get("/reset/:token",getNewpassword)
authroute.post("/newpassword",psotNewPassword)






module.exports =authroute
