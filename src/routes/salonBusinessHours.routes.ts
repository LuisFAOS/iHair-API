import express from "express"
import createBusinessHours from "../controllers/salonBusinessHoursControllers/createBusinessHours.controller"

import updateSalonBusinessHours from "../controllers/salonBusinessHoursControllers/updateBusinessHours.controller"

import verifyAuth from "../middlewares/authHandler"
import verifySalon from "../middlewares/verifySalonHandler"

const router = express.Router()

router.post("/salon-business-hours", 
    verifySalon, 
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    createBusinessHours
)

router.patch("/salon-business-hours",
    verifySalon,
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    updateSalonBusinessHours
)

export default router
