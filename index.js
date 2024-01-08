import app from "./app.js"

const PORT = process.env.PORT || 3001;

app.get("/",(_,res)=> res.send("<h1>Stock Management</h1>"));

app.listen(PORT, ()=>{
    console.log("server is running");
});