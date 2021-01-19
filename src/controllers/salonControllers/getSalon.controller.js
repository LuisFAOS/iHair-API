import getSalonFromDB from "../../models/salonModels/getSalon.model.js"
import getOpeningHoursFromDB from "../../models/openingHoursModels/getOpeningHours.model.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"


async function getSalon(req, res) {
     const authToken = req.headers['authorization'] || req.headers['token']
     const {
          client,
          permissionOf
     } = await jwtDecoder(authToken)

     let whereProp
     if (permissionOf === "salonOwner")
          whereProp = {
               salonOwnerID: client.id
          }
     else
          whereProp = {
               id: req.query.id
          }

     if (whereProp) {
          const dbResultSalonDatas = await getSalonFromDB({
               ...whereProp
          })
          const dbResultOpeningHoursDatas = await getOpeningHoursFromDB({
               salonID: dbResultSalonDatas.id
          })

          res.status(200).send({
               dbResultSalonDatas,
               dbResultOpeningHoursDatas
          })
     } else {
          res.status(400).send("ID inválido ou vázio")
     }
}

export default getSalon