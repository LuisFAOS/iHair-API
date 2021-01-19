import express from "express"

import verifyAuth from "../middlewares/authHandler.js"

import * as clientSchedule from "../controllers/clientScheduleControllers/index.js"

const router = express.Router()


router.post("/client-schedule",
     (req, res, next) => verifyAuth(req, res, next, "normalUser"),
     clientSchedule.create)



router.get("/client-schedule",
     (req, res, next) => verifyAuth(req, res, next, "dont need permission"),
     clientSchedule.get)


router.delete("/client-schedule",
     (req, res, next) => verifyAuth(req, res, next, "dont need permission"),
     clientSchedule.delete)


export default router