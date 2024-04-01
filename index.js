const express = require("express");
const app = express();
const path = require("path");
require("./db/conn")
const PORT = process.env.PORT || 3000;
const bodyparsser= require("body-parser");
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
})
app.get("/mentorregister",(req,res)=>{
    res.render("regmentor");
})

app.post("/register",(req,res)=>{
    const {fname,lname,email,password,study_level,course} = req.body;
    console.log(req.body);
    const newmentee = new Mentee({
        fname,
        lname,
        email,
        password,
        study_level,
        course
    });
    newmentee.save();
});

app.post("/mentorregister",(req,res)=>{
    const {fname,lname,email,password,study_level,course,exp} = req.body;
    console.log(req.body);
    const newmentor = new Mentor({
        fname,
        lname,
        email,
        password,
        study_level,
        course,
        exp
    });
    newmentor.save();
});
app.listen(PORT,()=>console.log(`Listening to port ${PORT}`));