import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected (Local)')
  } catch (error) {
    console.error('DB Error:', error.message)
    process.exit(1)
  }
}

export default connectDB
