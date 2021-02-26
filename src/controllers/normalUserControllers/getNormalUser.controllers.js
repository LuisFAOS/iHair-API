import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"
import jwtGenerator from "../../libs/JWT/jwtTokenGenerator.js"

import {getNormalUserFromDB} from "../../models/normalUser.models.js"

import cepPromise from 'cep-promise'
import bcrypt from "bcryptjs"

async function getUserByID(req, res) {
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']

     const {
          client
     } = await jwtDecoder(authToken)

     const dbResultUserDatas = await getNormalUserFromDB({
          id: client.id
     })

     delete dbResultUserDatas.passwordHashed

     const userCompleteAddress = await cepPromise(dbResultUserDatas.CEP)

     res.status(200).send({
          userDatasFromDB: dbResultUserDatas,
          userCompleteAddress,
     })
}

async function loginHandler(req, res) {
     const {
          email,
          password
     } = req.body

     const dbResultUserDatas = await getNormalUserFromDB({
          email
     })
     if (!dbResultUserDatas || !dbResultUserDatas.isVerified) {
          res.status(404).send("Esse email ainda não foi cadastrado ou validado.")
          return
     }

     const isValidPassword = await bcrypt.compare(password, dbResultUserDatas.passwordHashed)
     if (!isValidPassword) {
          res.status(400).send("A senha está inválida, tente outra")
          return
     }

     const authToken = await jwtGenerator(dbResultUserDatas, "normalUser");
     const {
          client,
          permissionOf
     } = await jwtDecoder(authToken)

     res.status(202).send({
          client,
          permissionOf,
          authToken
     })
}

export {
     getUserByID,
     loginHandler
}