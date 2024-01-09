export default function errorHandler(error, req, res, next){
    if (error.name === "CatchError"){
        return res.status(400).send({error:"malformatted id"});
    }
    next(error);
}