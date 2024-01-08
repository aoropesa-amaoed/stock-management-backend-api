import express from "express";
import itemController from "../controller/itemController.js";


const  itemRouter = express.Router();


// app.get("/", (req, res)=>{
//     return res.send("<h1>Stock Management</h1>");
// });
itemRouter.get("/info", itemController.getItemsInfo);
itemRouter.get("/", itemController.getItems);
itemRouter.get("/:id", itemController.getItemsbyId);
itemRouter.delete("/:id",itemController.deleteItembyId);
itemRouter.post("/",itemController.createNewItem);
itemRouter.put("/:id", itemController.updateItem);

export default itemRouter;
