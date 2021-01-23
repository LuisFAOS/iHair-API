import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import {getRatingsFromDB} from "../../models/rating.models.js"
import {getSalonFromDB} from "../../models/salon.models.js"



async function getRating(req, res){
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
        const {id} = await getSalonFromDB({
            salonOwnerID: client.id
        })

        whereProps = {
            salonID: id
        }
    }

    const dbResultRatingDatas = await getRatingsFromDB(whereProps)
    res.status(200).send(dbResultRatingDatas)
}   

export default getRating