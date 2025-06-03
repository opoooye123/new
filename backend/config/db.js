import mongoose from 'mongoose';


const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/vinchenzia');
        console.log('Succesfully connected to database 😤✅')
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDb