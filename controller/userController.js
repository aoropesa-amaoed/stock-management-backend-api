import bcrypt from "bcrypt";
import User from "../models/User.js";

async function createUser(req, res, next){
    const {userType, accountName, userName, password}= req.body;


    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        userType,
        accountName,
        userName,
        passwordHash,
    });

    try {
        
    const savedUser = await user.save();

    return res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
}
export default{
    createUser,
}