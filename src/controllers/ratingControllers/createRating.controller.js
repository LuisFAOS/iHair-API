import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import ratingValidationHandler from "../../validations/rating.validation.js";

import {getRatingsFromDB, addRatingInDB} from "../../models/rating.models.js"
import {getClientScheduleFromDB} from "../../models/clientSchedule.models.js"


async function createRating(req, res) {
    const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']

    const {
        client
    } = await jwtDecoder(authToken)

    const {
        numericRatings,
        isCleaning,
        comment,
        salonID,
        scheduleID
    } = req.body

    const possibleErrorMessage = await ratingValidationHandler(numericRatings, comment)
    if (possibleErrorMessage) {
        res.status(400).send(possibleErrorMessage)
        return
    }

    const dbResultClientScheduleDatas = await getClientScheduleFromDB({
        normalUserID: client.id,
        salonID,
        id: scheduleID,
        status: "FECHADO"
    })

    const dbResultRatingsDatas = await getRatingsFromDB({
        normalUserID: client.id,
        salonID
    })

    if (!dbResultClientScheduleDatas[0] || !dbResultRatingsDatas[0]) {
        await addRatingInDB({
            ...numericRatings,
            isCleaning: !!isCleaning,
            comment,
            salonID,
            normalUserID: client.id
        })

        res.status(201).send("Avaliação feita com sucesso! Muito obrigado por colaborar com os serviços do iHairSLS!!")
        return
    }

    res.status(400).send("Você não pode avaliar esse salão!" +
        " Ele já possui uma avaliação sua, ou você não utilizou nenhum serviço dele ainda!")

}

export default createRating