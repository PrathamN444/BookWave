import mongoose from "mongoose"


export const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName : "BookWave_database",
    })
    .then((c) => console.log(`database connected to ${c.connection.host}`))
    .catch(err => console.log(err));
}