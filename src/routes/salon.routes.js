import * as salonControllers from "../controllers/salonControllers/index.js"

import express from "express"

import verifyAuth from "../middlewares/authHandler.js"

const router = express.Router()


//create salon
router.post('/salon',
     (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
     salonControllers.create)

//get salon datas
router.get('/salon',
     (req, res, next) => verifyAuth(req, res, next, "dont need permission"),
     salonControllers.get)

//list all salons
router.get('/salon/all',
     (req, res, next) => verifyAuth(req, res, next, "normalUser"),
     salonControllers.getAll)

//update salon datas
router.patch('/salon',
     (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
     salonControllers.update)

export default router