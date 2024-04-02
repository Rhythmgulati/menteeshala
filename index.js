const express = require("express");
const app = express();
const path = require("path");
require("./db/conn")
const PORT = process.env.PORT || 3000;
const bodyparsser= require("body-parser");
const bcrypt = require("bcrypt");

app.use(bodyparsser.urlencoded({extended:true}));
const hbs = require("hbs");
app.set("view engine","hbs");

const staticpath = path.join(__dirname,"./public");
app.use(express.static(staticpath));
const templatepath = path.join(__dirname,"./templates/views");
app.set("views",templatepath);

const Mentee = require("./models/menteeregister");
const Mentor = require("./models/mentorregistor");

app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("reg");
});
app.get("/mentorregister",(req,res)=>{
    res.render("regmentor");
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
    newmentor.save();
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
  res.status(201).render("index")
});

app.post("/mentorlogin",async(req,res)=>{
    const {email,password} = req.body;
    const user = await Mentor.findOne({email});
    console.log(user);
    if(!user){
      res.status(501).render("login");
    }
    const isvalid = await bcrypt.compare(password,user.password);
    console.log(isvalid);
    if(!isvalid){
      res.status(500).render("login")
    }
    res.status(201).render("index");
})
app.listen(PORT,()=>console.log(`Listening to port ${PORT}`));