import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    
    itemCode: String,
    itemDescription: String,    
    inventoryUoM:String,
    price: Number,
    InStock:Number,
    MinStock:Number,
    MaxStock:Number,
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