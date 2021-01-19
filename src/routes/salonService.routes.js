import express from "express"

import verifyAuth from "../middlewares/authHandler.js"

import * as salonService from "../controllers/salonServiceControllers/index.js"

const router = express.Router()

router.post("/salon-service",
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    salonService.create)

router.get("/salon-service",
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    salonService.get)

router.patch("/salon-service",
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    salonService.update)

router.delete("/salon-service",
    (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
    salonService.delete)


export default router