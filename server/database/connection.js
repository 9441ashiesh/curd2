const mongoose = require('mongoose');
const dotenv = require('dotenv');
MONGO_URI = "mongodb+srv://avinash:abhi123@csa.6qiml1r.mongodb.net/?retryWrites=true&w=majority"
console.log(MONGO_URI);
const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB