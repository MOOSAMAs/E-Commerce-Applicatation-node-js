import mongoose from "mongoose"

export const dbConnection = ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log('Database Connected..');
    }).catch((err)=>{
        console.log('ERROR' , err);
    })
}
