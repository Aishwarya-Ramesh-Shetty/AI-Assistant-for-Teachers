const mongoose = require('mongoose')

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected")
    }
    catch(err){
        console.error("Mongodb error",err.message)
    }
}

module.exports = connectDB;