import express from "express"

import updateSalonOpeningHours from "../controllers/salonOpeningHoursControllers/updateOpeningHours.controller.js"

import verifyAuth from "../middlewares/authHandler.js"
import verifySalon from "../middlewares/verifySalonHandler.js"

const router = express.Router()

router.patch("/salon-opening-hours",
    verifySalon,
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    updateSalonOpeningHours)


export default router