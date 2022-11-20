import {NextFunction, Request,Response} from 'express'
import { verify } from 'jsonwebtoken';

interface Payload{
    sub:string
}

export function isAuthenticated(
    req:Request,
    res:Response,
    next:NextFunction
){
   //---------Receber token----------
    let authToken = req.headers.authorization
    if(!authToken){
        return res.status(401).end()
    }
    let [,token]=authToken.split(" ");

    try{
        let {sub}= verify(token, process.env.JWT_SECRET) as Payload; 

        //Recuperar id do token e colocar no request
        req.user_id = sub;
        return next();
    }catch{
        res.status(401).end()
    }
   
}