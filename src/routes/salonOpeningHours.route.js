import express from "express"

import updateSalonOpeningHours from "../controllers/salonOpeningHoursControllers/updateOpeningHours.controller.js"

import verifyAuth from "../middlewares/authHandler.js"

const router = express.Router()

router.patch("/salon-opening-hours",
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    updateSalonOpeningHours)


export default router