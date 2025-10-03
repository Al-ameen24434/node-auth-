
const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`database connected successfully`);

    }catch(e){
        console.error(`database connection failed `);
        process.exit(1)

    }
}

module.exports = connectDB;
