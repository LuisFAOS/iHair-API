import jwtDecoder from "../../libs/JWT/jwtDecoder"

import SalonService from "../../models/salonService.models"
import returnAsPerUserRole from "../../utils/returnAsPerUserRole"


async function getAllSalonServices(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const {id, name, permissionOf} = await jwtDecoder(authToken)

     const whereProps = await returnAsPerUserRole(permissionOf, {id, name})

     const _db_salon_service = await SalonService.getFromDB(whereProps)

     res.status(200).send(_db_salon_service)

}

export default getAllSalonServices