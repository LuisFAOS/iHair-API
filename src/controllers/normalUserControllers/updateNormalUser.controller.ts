import NormalUser from "../../models/normalUser.models"

import jwtDecoder from "../../libs/JWT/jwtDecoder";
import { Request, Response } from "express";

async function updateNormalUser(req: Request, res: Response) {
    const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
    const {
         id: clientID
    } = await jwtDecoder(authToken)
    const {name, CEP} = req.body
    
    const normalUserUpdated = new NormalUser(name, CEP, "xxx@xxx.xx")
    const possibleErrorMessage = await normalUserUpdated.validate()
    if (possibleErrorMessage) return res.status(400).send(possibleErrorMessage)

    await normalUserUpdated.updateInDB({id: clientID})

    res.status(202).send("Usuário atualizado com sucesso!")
}

export default updateNormalUser
