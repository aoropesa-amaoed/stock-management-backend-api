import  itemModel from "../models/itemModel.js";

async function getItemsInfo (_, res){
    const item = await itemModel.find({});   
    const itemCount = await item.length;
    return res.send(`<p>Items has a total of ${itemCount}</p>`)
}
async function getItems(req, res){
    const item = await itemModel.find({});
    return res.json(item);
}

async function getItemsbyId(req, res){
    const id = req.params.id;
    const item = await itemModel.findById(id);
    return res.json(item);
}
async function deleteItembyId(req, res){
    //access id
    const id = req.params.id;
    //get item master data array then re-assigned the value
    await itemModel.findByIdAndDelete(id);
    //send response to client status 204 then end the request
    return res.status(204).end();   
}
async function createNewItem(req, res){
    
    const body = req.body;
    //validate if there is no content when creating a new item
    if(!body.itemCode || !body.itemDescription){
      return res.status(400).json({
        error:"Both item code and item description are required"});      
    }    
    const item = new itemModel({
        
        itemCode: body.itemCode,
        itemDescription: body.itemDescription,
        inventoryUoM: body.inventoryUoM,
        price: body.price,
        InStock:body.InStock,
        MinStock:body.MinStock,
        MaxStock:body.MaxStock,        
     })
        //get the item master data array then push the new item
        const itemSaved =  await item.save().then((result) => result)
      //send response to client status 204 then end the request
        return res.status(201).json(itemSaved);  
}
async function updateItem(req, res) {
    const id = req.params.id;
    const {
      itemCode,
      itemDescription,
      inventoryUoM,
      price,
      InStock,
      MinStock,
      MaxStock,
    } = req.body;
  
    const updatedItem = {
  
      itemCode,
      itemDescription,
      inventoryUoM,
      price,
      InStock,
      MinStock,
      MaxStock,
    };
  
    const returnedItem = await itemModel
      .findByIdAndUpdate(id, updatedItem, { new: true })
      .then((result) => result);
  
    return res.status(200).json(returnedItem);
  }


export default{
    getItemsInfo,
    getItems,
    getItemsbyId,
    deleteItembyId,
    createNewItem,
    updateItem,
}