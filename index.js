import app from "./app.js"
import config from "./utils/config.js";

const PORT = config.PORT || 3001;

app.get("/",(_,res)=> res.send("<h1>Stock Management</h1>"));

app.listen(PORT, ()=>{
    console.log("server is running");
});