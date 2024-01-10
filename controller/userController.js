import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../utils/config.js";

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

async function loginUser(req, res, next){
    const {userName, password} = req.body;
    const user = await User.findOne({userName});
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash);
    if(!(user && passwordCorrect)){
        return res.status(401).json({error: "Invalid username or password"})
    }
    const userToken = {
        username: user.userName,
        id: user._id
    }
    const token = jwt.sign(userToken, config.JWT_SECRET, {
        expiresIn: 60
    });
    return res.status(200).json({token, userName:user.userName, name: user.accountName})
}

export default{
    createUser,
    loginUser,
}