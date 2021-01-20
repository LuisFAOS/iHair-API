import bcrypt from "bcryptjs"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"
import jwtGenerator from "../../libs/JWT/jwtTokenGenerator.js"

import {
     getSalonOwnerFromDB,
     getSalonOwnerAllDatasFromDB
} from "../../models/salonOwnerModels/getSalonOwner.model.js"

async function getSalonOwnerByID(req, res) {
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.heade
     const {
          client,
          permissionOf
     } = await jwtDecoder(authToken)

     const ownerIDParam = req.query.ownerID
     
     const ownerID = permissionOf === "salonOwner" ? client.id : ownerIDParam
     if (ownerID) {
          const dbResultsOwnerDatas = await getSalonOwnerFromDB({
               id: ownerID
          })
          if (permissionOf !== "salonOwner") {
               delete dbResultsOwnerDatas.email
          }

          res.status(202).send(dbResultsOwnerDatas)
          return
     }
     res.status(400).send("ID do dono inválido!")
}

async function loginHandler(req, res) {
     const {
          email,
          password
     } = req.body

     const dbResultsOwnerDatas = await getSalonOwnerAllDatasFromDB({
          email
     })
     if (!dbResultsOwnerDatas || !dbResultsOwnerDatas.isVerified) {
          res.status(400).send("O email ou não foi cadastrado ou não foi validado, verifique")
          return
     }

     const isValidPassword = await bcrypt.compare(password, dbResultsOwnerDatas.passwordHashed)
     if (!isValidPassword) {
          res.status(404).send("Senha está incorreta. Por favor, tente outra.")
          return
     }

     const authToken = await jwtGenerator(dbResultsOwnerDatas, "salonOwner");
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
     getSalonOwnerByID,
     loginHandler
}