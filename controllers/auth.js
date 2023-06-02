const crypto = require('crypto')
const User = require("../models/user")
const { generateMailtranspoter } = require("../utils/mail")
const {validationResult} =require('express-validator')

exports.getLogin = (req, res, next) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/login', {
        pageTitle: "Login",
        isAuthenticated: req.session.isloggedIn,
        errorMessage: message,
        oldInput:{
            email:"",
            password:""
        }
    })
}
exports.getsignup = (req, res) => {
    console.log(req.body);
    let message = req.flash("error")
    if (message.length > 0) {
        message = message[0]
    }
    else {
        message = null
    }
    res.render('auth/signup', {
        pageTitle: "Signup",
        isAuthenticated: false,
        errorMessage: message,
        oldInput:{
            email:'' ,
            password:'',
            confirmpassword:''
       },
       validationError:[]
    })
    // console.log(/oldinpu/,oldInput);
}

exports.postsignup = async (req, res) => {
    const { email, password, confirmpassword } = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
            console.log(/errors/,errors.array()[0].msg);
            return res.render('auth/signup', {
                pageTitle: "Signup",
                errorMessage: errors.array()[0].msg,
                oldInput:{
                     email:email,
                     password:password,
                     confirmpassword:confirmpassword
                },
                validationError: errors.array()
            })
        
        }
    const oldemail = await User.findOne({ email })
    if (oldemail) {
        req.flash('error', 'E-mail exists allready please choose different one!')
        return res.redirect('/signup')
    }

    if(password !== confirmpassword){
        req.flash('error', 'password have to match')
        return res.redirect('/signup')
    }
    const user = new User(req.body)
    await user.save()

    var transport = generateMailtranspoter()
    transport.sendMail({
        from: "verfication@otp.gmail.com",
        to: user.email,
        subject: "Email Verification",
        html: ` 
      <h1>You signup successfully!,
        Thanl you for choosing us!!</h1>`
    })

    res.redirect("/")

}

exports.postlogin = async (req, res) => {
    try{
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (!user) {
        req.flash('error', 'Invalid email or password')
        return res.redirect('/login')
    }
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.render('auth/login', {
            pageTitle: "Login",
            errorMessage: errors.array()[0].msg,
            oldInput:{
                email:email,
                password:password,
           },
        })
    }
    const matched = await user.comparepassword(password)
    
    if (!matched) {
        req.flash('error', 'Invalid email or password')
        return res.redirect('/login')
    }
    req.session.user = user;
    req.session.isloggedIn = true

     res.redirect("/")
}catch(e){
    console.log(e);
}
}

exports.postlogout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    })
}

exports.getresetPassword = (req, res) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/resetPass', {
        pageTitle: "Reset password",
        errorMessage: message
    })
}

exports.postReset = (req, res) => {
    const { email } = req.body
    crypto.randomBytes(32, async (err, buff) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset')
        }
        const token = buff.toString('hex')
        console.log(/token/, token);

        const user = await User.findOne({ email })
        if (!user) {
            req.flash('error', ' email is not found!')
            return res.redirect('/reset')
        }
        user.resetToken = token
        user.resetTokenExpiration = Date.now() + 3600000
        await user.save()
        const resetpasswordurl = `http://localhost:5000/reset/${token}`

        var transport = generateMailtranspoter()
        transport.sendMail({
            from: "verfication@otp.gmail.com",
            to: user.email,
            subject: "Password Reset link ",
            html: ` 
      <p>Click here to reset your password</p>
      <a href="${resetpasswordurl}">Change Password</a>`
        })

        res.redirect("/")


    })
}

exports.getNewpassword = async (req, res) => {
    const token = req.params.token
    // console.log(/t/, token);
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })

    if (!user) {
        // console.log('donee');
        return res.redirect('/')

    }

    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/newPassword', {
        pageTitle: "New Password",
        isAuthenticated: req.session.isloggedIn,
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
    })
    // console.log(/token/,token)
    // console.log(/id/,user._id)

}

exports.psotNewPassword = async (req, res) => {
    try{
        
        const { password,passwordToken, userId } = req.body
        console.log(/body/,req.body);
        
        const user = await User.findOne({
            resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now()}, _id:userId
        })

        if (!user) {
            console.log('not found');
            return res.redirect('/reset')
        }
        user.password = password
        user.resetToken = undefined
        user.resetTokenExpiration = undefined
        await user.save()
        
        res.redirect("/login")

        var transport = generateMailtranspoter()
        transport.sendMail({
            from: "verfication@otp.gmail.com",
            to: user.email,
            subject: "Password Reset Successfully ",
            html: ` 
            <h1>your password reset successfully</h1>
            <p Now you use your new Password</p>`
        })
        
        
    }catch(e){
        console.log(e);
    }
        
}