import jwtDecoder from "../libs/JWT/jwtTokenDecoder.js"

import {getSalonFromDB} from "../models/salon.models.js";


async function verifySalon(req, res, next) {
    const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
    const {
        client,
        permissionOf
    } = await jwtDecoder(authToken)

    if (permissionOf === "salonOwner") {
        const dbResultSalonDatas = await getSalonFromDB({
            salonOwnerID: client.id
        })
    
        if(!dbResultSalonDatas || !dbResultSalonDatas.isVerified){
            res.status(400).send("O salão não existe, ou não foi validado ainda!")
            return
        }

        next()
        return
    }

    next()
    
}


export default verifySalon