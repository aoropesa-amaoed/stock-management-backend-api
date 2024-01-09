export default function errorHandler(error, req, res, next){
    if (error.name === "CatchError"){
        return res.status(400).send({error:"malformatted id"});
    }else if(error.name === "ValidationError"){
        return res.status(400).json({error: error.message});
    }else{
        return res.status(500).json({ error: "Internal Server Error" });
    }
    next(error);
}