import jwtDecoder from "../../libs/JWT/jwtDecoder"

import SalonRating from "../../models/salonRating.models"
import ClientScheduleClass from "../../models/clientSchedule.model"


async function createRating(req, res) {
    const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']

    const {
        id: clientID
    } = await jwtDecoder(authToken)

    const {
        numeric_ratings,
        is_salon_clean,
        comment,
        _salon_id,
        _schedule_id
    } = req.body

    const possibleErrorMessage = await SalonRating.validate(numeric_ratings, comment)
    if (possibleErrorMessage) {
        res.status(400).send(possibleErrorMessage)
        return
    }
    const newSalonRating = new SalonRating({...numeric_ratings, comment, is_salon_clean })

    const _db_client_schedule = await ClientScheduleClass.getFromDB({
        _normal_user_id: clientID,
        _salon_id,
        id: _schedule_id,
        status: "FECHADO"
    })

    const _db_salon_ratings = await SalonRating.getFromDB({
        _normal_user_id: clientID,
        _salon_id
    })

    if (!_db_client_schedule[0] || !_db_salon_ratings[0]) {
        await newSalonRating.addToDB(_salon_id, clientID)

        res.status(201).send("Avaliação feita com sucesso! Muito obrigado por colaborar com os serviços do iHairSLS!!")
        return
    }

    res.status(400).send("A avaliação falhou!" +
        " Ele já possui uma avaliação sua, ou você não utilizou nenhum serviço dele ainda!")
}

export default createRating