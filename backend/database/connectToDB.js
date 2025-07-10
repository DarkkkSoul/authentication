import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Database connected');
    } catch (error) {
        console.log('Error in connecting DB:', error);
        process.exit(1);
    }
}
export default connectToDB