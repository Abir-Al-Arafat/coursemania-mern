// const mongoose = require('mongoose')
import mongoose from "mongoose";

const databaseConnection = async (callback: () => void) => {
    try {
        if (process.env.DATABASE_URL) {
            const client: typeof mongoose = await mongoose.connect(process.env.DATABASE_URL);
            if (client) {
                console.log(`database connected`);
                callback();
            } else {
                console.log(`Database URL is not provided`);
            }
        } else {
            console.log("URL env not found");
        }
    } catch (error) {
        console.log(error);
    }
};

export default databaseConnection;
