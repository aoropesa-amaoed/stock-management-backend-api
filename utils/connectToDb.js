import mongoose from "mongoose";

export default function connectToDb(url){
    mongoose.connect(url).then((_)=>console.log("Connected to DB"))
} 