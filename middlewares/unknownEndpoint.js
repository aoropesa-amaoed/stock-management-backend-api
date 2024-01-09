//also a middleware, however calling it at the end of the http methods
export default function unknownEnpoint(_, res)   {
    res.status(404).send({error:"unknown endpoint"})
}