import express from "express"

import verifyAuth from "../middlewares/authHandler.js"
import verifySalon from "../middlewares/verifySalonHandler.js"

import * as rating from "../controllers/ratingControllers/index.js"

const router = express.Router()

router.post('/rate', 
    (req, res, next) => verifyAuth(req, res, next, "normalUser"),
    rating.create
)

router.get('/rate', 
    verifySalon,
    (req, res, next) => verifyAuth(req, res, next, "dont need permission"),
    rating.get
)

export default router