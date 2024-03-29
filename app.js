import express from "express";
import morgan from "morgan";
import cors from "cors";
import itemRouter from "./routes/itemRouter.js";
import userRouter from "./routes/userRouter.js";
import unknownEnpoint from "./middlewares/unknownEndpoint.js";
import connectToDb from "./utils/connectToDb.js";
import errorHandler from "./middlewares/errorHandler.js";
import config from "./utils/config.js";



const MONGODB_URI = config.MONGODB_URI;
const app = express();

connectToDb(MONGODB_URI);

morgan.token("body",function(req, res){
    return JSON.stringify(req.body);
});

app.use(cors());  
app.use(express.json());
app.use(express.static("dist"));
app.use(morgan(":method :url :status - :response-time ms :body"));

app.use("/users",userRouter);
app.use("/items", itemRouter);

app.use(unknownEnpoint);
app.use(errorHandler);

export default app;