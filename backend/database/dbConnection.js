import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: 'MERN_STACK_HOSPITAL_MANAGMENT_SYSTEM'
    })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log(`Some error detected in database connection ${err}`);
    })
};