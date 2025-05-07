const mongoose = require('mongoose');


//connect to db function
const connectDB = async ()=>{
    //If you query the field that is not exist in Schema Mongoose will ignore this!!!
    mongoose.set('strictQuery',true);
    const connects = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${connects.connection.host}`);
}

module.exports = connectDB;