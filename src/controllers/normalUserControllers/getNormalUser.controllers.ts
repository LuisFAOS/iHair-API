import jwtDecoder from "../../libs/JWT/jwtDecoder"
import jwtGenerator from "../../libs/JWT/jwtGenerator"

import cepPromise from 'cep-promise'
import bcrypt from "bcryptjs"
import { Request, Response } from "express"

import NormalUser from "../../models/normalUser.models"


async function getUserByID(req: Request, res: Response) {
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']

     const {id: clientID} = await jwtDecoder(authToken)

     const _db_normal_user = await NormalUser.getFilteredDataFromDB({
          id: clientID
     })

     const completeAddress = await cepPromise(_db_normal_user.CEP)
     delete completeAddress.service

     res.status(200).send({
          user: {
               ..._db_normal_user,
               completeAddress
          },
     })
}

async function loginHandler(req: Request, res: Response) {
     const {
          email,
          password
     } = req.body

     const _db_normal_user = await NormalUser.getAllDataFromDB({
          email
     })
     if (!_db_normal_user || !_db_normal_user.is_verified) {
          res.status(404).send("Esse email ainda não foi cadastrado ou validado.")
          return
     }

     const isValidPassword = await bcrypt.compare(password, _db_normal_user.password_hashed)
     if (!isValidPassword) {
          res.status(400).send("A senha está inválida, tente outra")
          return
     }

     const authToken:string = await jwtGenerator(_db_normal_user, "normalUser");
     const {id, name, permissionOf} = await jwtDecoder(authToken)

     res.status(202).send({
          id, name, permissionOf,
          authToken
     })
}

export {
     getUserByID,
     loginHandler
}
