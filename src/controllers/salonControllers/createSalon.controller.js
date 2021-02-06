import salonValidationHandler from "../../validations/salon.validation.js"
import salonImgValidationHandler from "../../validations/salonImg.validation.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"
import uploadImgToAzure from "../../libs/azure/uploadImgToAzure.js"

import {getSalonFromDB, addSalonInDB} from "../../models/salon.models.js"
import {getSalonOwnerFromDB, updateSalonOwnerInDB} from "../../models/salonOwner.models.js"


async function createSalon(req, res) {
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
     const {
          client
     } = await jwtDecoder(authToken)

     let dbResultSalonDatas = await getSalonFromDB({
          salonOwnerID: client.id
     })
     if (dbResultSalonDatas) {
          res.status(406).send("Já existe um salão cadastrado nessa conta.")
          return
     }

     const {
          salonDatas,
          salonImgsInBase64
     } = req.body

     if (salonDatas.isAcceptPersonPhoneAsContact) {
          const dbResultOwnerDatas = await getSalonOwnerFromDB({
               id: client.id
          })
          salonDatas.contactPhone = dbResultOwnerDatas.phone
     }

     const possibleSalonErrorMessage = await salonValidationHandler(salonDatas)
     //const validSalonImgsDatas = await salonImgValidationHandler(salonImgsInBase64)

     if (possibleSalonErrorMessage) {
          res.status(400).send(possibleSalonErrorMessage)
          return
     }

     salonDatas.createdAt = new Date()

     salonDatas.bannerImgUrl = await uploadImgToAzure(salonDatas.bannerImgInBase64, "salonsbanners")
     /*salonImgsUrl = salonImgsInBase64.map(async salonImgInBase64 => {
          await uploadImgToAzure(salonImgInBase64, "salonimgs")
     })*/

     await addSalonInDB(salonDatas, client.id)
     dbResultSalonDatas = await getSalonFromDB({
          salonOwnerID: client.id
     })

     //await addSalonImgs(salonImgs, dbResultSalonDatas.id)

     await updateSalonOwnerInDB({
          hasSalon: true
     }, {
          id: client.id
     })

     res.status(201).send("Salão criado com sucesso!")

}

export default createSalon