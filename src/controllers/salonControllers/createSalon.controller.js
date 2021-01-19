import salonValidationHandler from "../../validations/salon.validation.js"
import openingHoursValidationHandler from "../../validations/openingHours.validation.js"
import salonImgValidationHandler from "../../validations/salonImg.validation.js"

import tokenDecoder from "../../libs/JWT/jwtTokenDecoder.js"
import uploadImgToAzure from "../../libs/azure/uploadImgToAzure.js"

import getSalonFromDB from "../../models/salonModels/getSalon.model.js"
import {getSalonOwnerFromDB} from "../../models/salonOwnerModels/getSalonOwner.model.js"
import addSalonInDB from "../../models/salonModels/createSalon.model.js"
import addOpeningHoursInDB from "../../models/openingHoursModels/createOpeningHours.model.js"
import updateSalonOwnerInDB from "../../models/salonOwnerModels/updateSalonOwner.model.js"


async function createSalon(req, res) {
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
     const {
          client
     } = await tokenDecoder(authToken)

     let dbResultSalonDatas = await getSalonFromDB({
          salonOwnerID: client.id
     })
     if (dbResultSalonDatas) {
          res.status(406).send("Já existe um salão cadastrado nessa conta.")
          return
     }

     const {
          salonDatas,
          openingHours,
          salonServices,
          salonImgsInBase64
     } = req.body

     if (salonDatas.isAcceptPersonPhoneAsContact) {
          const dbResultOwnerDatas = await getSalonOwnerFromDB({
               id: client.id
          })
          salonDatas.contactPhone = dbResultOwnerDatas.phone
     }

     const validOpeningHoursDatas = await openingHoursValidationHandler(openingHours)
     const validSalonDatas = await salonValidationHandler(salonDatas)
     //const validSalonImgsDatas = await salonImgValidationHandler(salonImgsInBase64)

     const possibleErrorMessage = validSalonDatas || validOpeningHoursDatas

     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     salonDatas.createdAt = new Date()

     salonDatas.bannerImgUrl = await uploadImgToAzure(salonDatas.bannerInBase64, "salonsbanners")
     /*salonImgsUrl = salonImgsInBase64.map(async salonImgInBase64 => {
          await uploadImgToAzure(salonImgInBase64, "salonimgs")
     })*/

     await addSalonInDB(salonDatas, client.id)
     dbResultSalonDatas = await getSalonFromDB({
          salonOwnerID: client.id
     })

     await addOpeningHoursInDB(openingHours, dbResultSalonDatas.id)
     //await addSalonImgs(salonImgs, dbResultSalonDatas.id)

     await updateSalonOwnerInDB({
          hasSalon: true
     }, {
          id: client.id
     })

     res.status(201).send("Salão criado com sucesso!")

}

export default createSalon