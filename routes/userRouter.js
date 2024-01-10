import express from "express";
import userController from "../controller/userController.js";

const  userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.post("/login",userController.loginUser)


export default userRouter;