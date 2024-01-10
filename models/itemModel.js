import mongoose from "mongoose";
import User from "./User.js";

const itemSchema = new mongoose.Schema({
    
    category: String,
    itemCode: String,
    itemDescription: String,    
    inventoryUoM:String,
    price: Number,
    InStock:Number,
    MinStock:Number,
    MaxStock:Number,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});
itemSchema.set("toJSON", {
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
});

const itemModel = mongoose.model("Item",itemSchema);

export default itemModel;