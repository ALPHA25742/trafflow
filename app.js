import express from "express";
import mongoose from "mongoose"
import fs from "fs"
import multer from "multer"
import user from "./user.js"
import challan from "./image.js"

const app = express()
app.listen(3000)
app.set('view engine','ejs')
app.use(express.static('assets'))
app.use(express.urlencoded({extended:true}))

let currentuser

mongoose.connect("mongodb+srv://Iqbal:iqbalahmed@trafflow.ur3y5i4.mongodb.net/version1?retryWrites=true&w=majority")
.then(()=>console.log('connected to db'))
.catch(err=>console.log(err))

app.post('/signin',(req,res)=>{
    user.find({ email: req.body.email, password:req.body.password}).then(result=>{
        if (result.length==0) res.send('wrong credentials')
        currentuser=result[0].email
        res.redirect('/')
    }).catch(err=>{console.log(err.message)})

})

app.post('/signup',(req,res)=>{
    const newuser = new user(req.body)
    newuser.save().then(result=>{
        fs.mkdir(`./users/${req.body.username}`,(err)=>{
            if(err) console.log(err)
            console.log('folder created')
        })
        res.redirect('/')
        console.log('sign up successful')
    }).catch(err=>{res.send(err.message)})
})

// storage 
const Storage = multer.diskStorage({
    destination: "challans",
    filename: (req, file, cb) => { 
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: Storage })
.single('testImage')
app.post('/submit-challan',(req,res)=>{
    upload (req, res, (err)=>{
            if (err) res.send(err)
            else{
                console.log(req.body);
                const newImage = new challan({ location: req.body.location,
                    image: {
                        data: req.file.filename,
                        contentType: 'image/png'
                    }
                })
                newImage.save().then(() =>res.send('successfully upload')).catch(err => res.send(err))
            }})
})


app.get('/',(req,res)=>res.render('index'))
app.get('/index',(req,res)=>res.redirect('/'))
app.get('/signin-page',(req,res)=>res.render('login'))
app.get('/signup-page',(req,res)=>res.render('signup'))
app.get('/camera',(req,res)=>res.render('camera'))
app.get('/team',(req,res)=>res.render('team'))
app.get('/blog',(req,res)=>res.render('blog'))
app.get('/contact',(req,res)=>res.render('contact'))
app.get('/about',(req,res)=>res.render('about'))
app.get('/services',(req,res)=>res.render('services'))
app.get('/upload-challan',(req,res)=>res.render('upload-challan'))

