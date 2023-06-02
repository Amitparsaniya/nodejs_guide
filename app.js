const express= require("express")
const  bodyparser= require("body-parser")
const https =require('https')
const  productroute= require("./routes/shop")
const  session = require('express-session')
const  mongoDBstore = require("connect-mongodb-session")(session)
const flash =require('connect-flash')
const multer =require('multer')
const adminroute =require("./routes/admin")
const authroute =require("./routes/auth")
const morgan = require('morgan')
const User =require("./models/user")
require("./utils/database")
const path =require("path")
const fs =require("fs")
const helmet = require('helmet')
const { get500 } = require("./controllers/error")
const app =express()

const mongoDB_uri="mongodb+srv://root:root@cluster0.rjtyl8j.mongodb.net/?retryWrites=true&w=majority";
const store = new mongoDBstore({
  uri: mongoDB_uri,
  collection:'session'
})

// const csrfprotaction =csrf()

const privatekry = fs.readFileSync('server.key')
const certificate = fs.readFileSync("server.cert")


const pathdir =path.join(__dirname,"views")

const fileStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images')
  },
  filename:(req,file,cb)=>{
    cb(null, new Date().toString() + '-' + file.originalname)
  }
})
const fileFilter =(req,file,cb)=>{
  if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
    cb(null ,true)
  }else{
    cb(null,false)
  }i
}



app.use(bodyparser.json())
// app.use(express.json())
app.use(morgan("dev"))
app.use(bodyparser.urlencoded({extended: false}))
app.use(helmet())

app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))


 app.use(express.static(path.join(__dirname,"views")))
// for static file serving form images folder 
app.use('/images',express.static(path.join(__dirname,"images")))
app.use(
  session({secret:'my secret',resave: false,saveUninitialized: false,store:store})
  )
  
  // app.use(csrfprotaction)
  // db.then((res)=>console.log('done'))
  app.use(flash())
  
  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
  }
  User.findById(req.session.user._id)
      .then(user => {
        req.user = user
        next();
      })
    });
    // app.use((req,res,next)=>{
    //   //  res.locals.isAuthenticated=req.session.isloggedIn,
    //    res.locals.csrfToken =req.csrfToken()
    //    next()
    // })
    app.use(productroute)
    app.use(adminroute)
    app.use(authroute)



const dir=path.join(path.dirname("/node_guide/models"))

app.set("view engine","pug")
app.set("views","views")

app.get('/500',get500)
app.get("*",(req,res)=>{    
  res.render("404",{pageTitle:"Page not found!"}) 
})

const user = User.findOne()
if(!user){
  const user =new User({
    name:"Patel",
    email:"amit@gmail.com",
    cart:{
      items:[]
    }
  })
  user.save()
}
app.use((error,req,res,next)=>{
   res.render('500')
  //  res.redirect("/500")
})


// https.createServer({key:privatekry,cert:certificate},app).listen(5000,()=>{
//   console.log("your server is up on the server 5000")
  
// })

app.listen(5000,()=>{
  console.log('your server is started on the server 5000');
})
