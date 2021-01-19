import getClientScheduleFromDB from "../../models/clientScheduleModels/getClientSchedule.model.js"


async function getClientSchedule(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const {
          client,
          permissionOf
     } = await jwtDecoder(authToken)
     var whereProps

     if (permissionOf === "normalUser") {
          whereProps = {
               normalUserID: client.id
          }
     } else {
          whereProps = req.body.condition
     }

     const dbResultClientSchedules = await getClientScheduleFromDB(whereProps)
     res.status(200).send(dbResultClientSchedules)
}


export default getClientSchedule