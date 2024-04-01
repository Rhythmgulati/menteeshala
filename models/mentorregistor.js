const mongoose = require("mongoose");

const Mentorschema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    study_level:String,
    course:String,
    exp:String
});

module.exports = mongoose.model("Mentor",Mentorschema);