import express from "express"

import verifyAuth from "../middlewares/authHandler"
import verifySalon from "../middlewares/verifySalonHandler"

import * as salonService from "../controllers/salonServiceControllers"

const router = express.Router()

router.post("/salon-service",
    verifySalon,
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    salonService.create)

router.get("/salon-service",
    verifySalon,
    (req, res, next) => verifyAuth(req, res, next, "dont need permission"),
    salonService.get)

router.patch("/salon-service",
    verifySalon,
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    salonService.update)

router.delete("/salon-service",
    verifySalon,
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    salonService.delete)


export default router