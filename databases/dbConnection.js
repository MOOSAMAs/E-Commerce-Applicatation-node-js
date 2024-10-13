import mongoose from "mongoose"

export const dbConnection = ()=>{
    mongoose.connect('mongodb+srv://mohamed178:Mohamed@cluster0.dbycv4m.mongodb.net/E-CommerceApp').then(()=>{
        console.log('Database Connected..');
    }).catch((err)=>{
        console.log('ERROR' , err);
    })
}
