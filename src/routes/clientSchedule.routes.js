import express from "express"

import verifyAuth from "../middlewares/authHandler.js"
import verifySalon from "../middlewares/verifySalonHandler.js"

import * as clientSchedule from "../controllers/clientScheduleControllers/index.js"

const router = express.Router()


router.post("/client-schedule", 
     verifySalon,
     (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
     clientSchedule.create)


router.get("/client-schedule",
     verifySalon,
     (req, res, next) => verifyAuth(req, res, next, "dont need permission"),
     clientSchedule.get)


router.delete("/client-schedule",
     verifySalon,
     (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
     clientSchedule.delete)


router.patch("/client-schedule",
     verifySalon,
     (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
     clientSchedule.update)


export default router