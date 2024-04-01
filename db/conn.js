const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/menteeshala").then(()=>console.log("succesfullyconncetedb")).catch(()=>console.log("dbconncetionerror"))