import  itemModel from "../models/itemModel.js";
import User from "../models/User.js";

async function getItemsInfo (_, res, next){
  try {
    const item = await itemModel.find({});   
    const itemCount = await item.length;
    return res.send(`<p>Items has a total of ${itemCount}</p>`)
  } catch (error) {
    next(error);
  }  
}
async function getItems(req, res, next){
  try {
     const item = await itemModel.find({});
     return res.json(item);
  } catch (error) {
    next(error);
  }    
}//get specific item
async function getItemsbyId(req, res, next){
    const id = req.params.id;
    try{
      const item = await itemModel.findById(id);
      if(!item) return res.status(404).json({message:"Item not found!"});      
      return res.json(item);
    }catch(error){
      next(error);
    }
    
    
}
async function deleteItembyId(req, res, next){
    //access id
    const id = req.params.id;
    try {
      //get item master data array then re-assigned the value
    await itemModel.findByIdAndDelete(id);
    //send response to client status 204 then end the request
    return res.status(204).end();   
    } catch (error) {
      next(error);
    }
    
}
async function createNewItem(req, res, next){    
    const body = req.body;

    const user = await User.findById(body.userId);
    //validate if there is no content when creating a new item
    if(!body.itemCode || !body.itemDescription){
      return res.status(400).json({
        error:"Both item code and item description are required"});      
    } 
    const item = new itemModel({        
      category:body.category,
      itemCode: body.itemCode,
      itemDescription: body.itemDescription,
      inventoryUoM: body.inventoryUoM,
      price: body.price,
      InStock:body.InStock,
      MinStock:body.MinStock,
      MaxStock:body.MaxStock,   
      userId: user.id,     
   })  
    try {    
        //get the item master data array then push the new item
        const itemSaved =  await item.save().then((result) => result)
        user.items = user.items.concat(itemSaved._id);
        await user.save();
      //send response to client status 204 then end the request
        return res.status(201).json(itemSaved);  
    } catch (error) {
      next(error);
    }     
}
async function updateItem(req, res, next) {
    const id = req.params.id;
    const {
      category,
      itemCode,
      itemDescription,
      inventoryUoM,
      price,
      InStock,
      MinStock,
      MaxStock,
    } = req.body;
    const updatedItem = {  
      category,
      itemCode,
      itemDescription,
      inventoryUoM,
      price,
      InStock,
      MinStock,
      MaxStock,
    };
    try {    
      const returnedItem = await itemModel
        .findByIdAndUpdate(id, updatedItem, { new: true })
        .then((result) => result);    
      return res.status(200).json(returnedItem);
    } catch (error) {
      next(error);
    }    
  }
export default{
    getItemsInfo,
    getItems,
    getItemsbyId,
    deleteItembyId,
    createNewItem,
    updateItem,
}