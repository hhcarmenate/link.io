import mongoose from "mongoose";

export default async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Successfully connected!')
    } catch(error) {
        console.log(error)

        throw new Error('Unable to connect to the database!')
    }
}
