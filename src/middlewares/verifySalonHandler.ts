import { Request, Response } from "express";
import jwtDecoder from "../libs/JWT/jwtDecoder"

import Salon from "../models/salon.models";

async function verifyHasSalon(req: Request, res: Response, next) {
    try {
        const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
        const {id, name, permissionOf} = await jwtDecoder(authToken)

        if (permissionOf === "salonOwner") {
            const _db_salon = await Salon.getFromDB({
                _salon_owner_id: id
            })
        
            if(!_db_salon || !_db_salon.is_verified){
                res.status(400).send("O salão não existe, ou não foi validado ainda!")
                return
            }
        }
        next()    
    } catch (error) {
        return error.message
    }
}


export default verifyHasSalon