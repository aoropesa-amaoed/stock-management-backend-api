import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userType: String,
    accountName:String,
    userName: String,
    passwordHash:String,       
});
userSchema.set("toJSON", {
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
});

const User = mongoose.model("User",userSchema);

export default User;
