export default function  generateId(inventoryMasterData){
    const maxId = inventoryMasterData.length > 0 ? Math.max(...inventoryMasterData.map(n=>n.id)) : 0;
    return maxId +1;
};