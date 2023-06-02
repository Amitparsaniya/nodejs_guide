exports.get500 =(req,res,next)=>{
  res.status(500).render("500",{
    pageTitle: "Error!",
    isAuthenticated : res.session.isloggedIn
})
}
