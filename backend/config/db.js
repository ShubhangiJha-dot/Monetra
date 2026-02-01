const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{})
        console.log("MongoDB connected")
        console.log("CONNECTED TO DB:", mongoose.connection.name)

    }
    catch(err){
        console.error("Error connecting to MongoDB",err)
        process.exit(1)
    }
}

module.exports=connectDB