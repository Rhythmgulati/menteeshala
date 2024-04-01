const mongoose = require("mongoose");

const Menteeschema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    study_level:String,
    course:String
});

module.exports = mongoose.model("Mentee",Menteeschema);