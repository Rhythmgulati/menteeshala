const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
require("./db/conn")
const PORT = process.env.PORT || 3000;
const bodyparsser= require("body-parser");
const bcrypt = require("bcrypt");
const hbs = require("hbs");

app.use(bodyparsser.urlencoded({extended:true}));

app.set("view engine","hbs");
app.use(cookieParser());

const staticpath = path.join(__dirname,"./public");
app.use(express.static(staticpath));
const templatepath = path.join(__dirname,"./templates/views");
app.set("views",templatepath);

const Mentee = require("./models/menteeregister");
const Mentor = require("./models/mentorregistor");

const islogin = async (req, res, next) => {
    try {
      if (req.cookies.usermail){
       next(); 
      }
       else {
         res.redirect("/login");
        }
       
    } catch (error) {
      console.log(error.message);
    }
  };




app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("reg");
});

app.get("/mentorregister",(req,res)=>{
    res.render("regmentor");
});
app.get("/",(req,res)=>{
    res.render("index");
})
app.get('/mentordash',islogin,(req,res)=>{
    res.render('mentordash')
})

app.get('/mentors',islogin,async(req,res)=>{
    try {
        const usermail = req.cookies.usermail;
        const user = await Mentee.findOne({email:usermail});
        const course = user.course;
        console.log(user);
        console.log(course);
        const mentors = await Mentor.find({course:course});
        console.log(mentors);
        res.render('mentor',{mentors:mentors});  
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get("/find", async (req, res) => {
    try {
        const mentors = await Mentor.find({});

        // Convert experience to lowercase if it exists
        mentors.forEach(mentor => {
            if (mentor.exp !== undefined) {
                mentor.exp = mentor.exp.toLowerCase();
            } else {
                console.log("Experience field is undefined for mentor:", mentor);
            }
        });
        const mentorsJson = JSON.stringify(mentors); // Serialize mentors data to JSON
        res.render('mensearch', { mentorsJson: mentorsJson });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/dashboard',islogin,async (req,res)=>{
    try {
        const usermail = req.cookies.usermail;
        const user = await Mentee.findOne({email:usermail});
        const course = user.course;
        console.log(user);
        console.log(course);
        const mentors = await Mentor.find({course:course});
        console.log(mentors);
        res.render('dash',{user:user,mentors:mentors});  
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

   });
// register


app.post("/register",async (req,res)=>{
    const {fname,lname,email,password,study_level,course} = req.body;
    console.log(req.body);
    const hashedpassword =  await bcrypt.hash(password,10);
    const newmentee = new Mentee({
        fname,
        lname,
        email,
        password:hashedpassword,
        study_level,
        course
    });
    newmentee.save();
    res.cookie('usermail', email);
    res.status(201).redirect("/dashboard");
   
});

app.post("/mentorregister",async(req,res)=>{
    const {fname,lname,email,password,study_level,course,exp} = req.body;
    console.log(req.body);
    const hashedpassword =  await bcrypt.hash(password,10);
    const newmentor = new Mentor({
        fname,
        lname,
        email,
        password:hashedpassword,
        study_level,
        course,
        exp
    });
    res.cookie('usermail', email);

    newmentor.save();
    res.redirect('/mentordash')
});

// login 

app.post("/login",async(req,res)=>{
  const {email,password} = req.body;
  const user = await Mentee.findOne({email});
  console.log(user);
  if(!user){
    res.status(501).render("login");
  }
  const isvalid = await bcrypt.compare(password,user.password);
  console.log(isvalid);
  if(!isvalid){
    res.status(500).render("login")
  }
  res.cookie('usermail', email);
  res.status(201).redirect("/dashboard")
});

app.post("/mentorlogin",async(req,res)=>{
    const {email,password} = req.body;
    const user = await Mentor.findOne({email});
    console.log(user);
    if(!user){
     return res.status(501).render("login");
    }
    const isvalid = await bcrypt.compare(password,user.password);
    console.log(isvalid);
    if(!isvalid){
    return  res.status(500).render("login",{msg:"⚠ Invalid email or password"})
    }
    res.cookie('usermail', email);
    res.status(201).redirect("/mentordash");
});

app.get("/logout",async(req,res)=>{
    res.clearCookie("usermail");
    res.redirect("/");
});


app.listen(PORT,()=>console.log(`Listening to port ${PORT}`));