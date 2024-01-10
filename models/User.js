import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import itemModel from "./itemModel.js";


const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },  
    items:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
        },
    ]     
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
});

const User = mongoose.model("User", userSchema);

export default User;
