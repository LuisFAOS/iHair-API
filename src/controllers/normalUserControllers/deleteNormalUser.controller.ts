import { Request, Response } from "express"

import NormalUser from "../../models/normalUser.models"

import jwtDecoder from "../../libs/JWT/jwtDecoder"

async function deleteNormalUser(req: Request, res: Response) {
     const authToken = req.headers['authorization'] ||
          req.headers['x-access-token'] || req.headers['token']

     const {id: clientID} = await jwtDecoder(authToken)

     await NormalUser.deleteFromDB({id: clientID})

     res.status(200).send('Usuário deletado!')
}

export default deleteNormalUser