
exports.isAuth =(req,res,next)=>{
    if(!req.session.isloggedIn){
        return res.redirect('/')
    }
    next()
}