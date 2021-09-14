import jwtDecoder from "../../libs/JWT/jwtDecoder"

import Salon from "../../models/salon.models"
import BusinessHours from "../../models/businessHours.models"
import { Request, Response } from "express"

async function getSalon(req: Request, res: Response) {
     const auth_token = req.headers['authorization'] || req.headers['token']
     const {
          id: clientID,
          permissionOf
     } = await jwtDecoder(auth_token)

     let whereProp
     if (permissionOf === "salonOwner"){
          whereProp = {
               _salon_owner_id: clientID
          }
     }     
     else{
          whereProp = {
               id: req.query.id
          }
     }

     if (whereProp) {
          const _db_salon = await Salon.getFromDB(whereProp)

          const _db_business_hours = await BusinessHours.getFromDB({
               _salon_id: _db_salon.id
          })

          /* const dbResultGeneralAvgRate = true || await getAvgGeneralRatingFromDB({
               salonID: _db_salon.id
          }) */

          res.status(200).send({
               _db_salon,
               _db_business_hours,
               _db_general_avg_rating:"",
          })
     } else {
          res.status(400).send("ID inválido ou vázio")
     }
}

export default getSalon