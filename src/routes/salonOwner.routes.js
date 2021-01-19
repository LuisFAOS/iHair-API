import express from "express"
const router = express.Router()

import * as salonOwnerControllers from "../controllers/salonOwnerControllers/index.js"
import {
     loginHandler,
     getSalonOwnerByID
} from "../controllers/salonOwnerControllers/getSalonOwner.controllers.js"

import verifyAuth from "../middlewares/authHandler.js"


//SingIn/Login salon owner - route
router.get('/salon-owner/login', loginHandler)

//SingUp salon owner - route
router.post('/salon-owner', salonOwnerControllers.create)

//update salon owner datas - route
router.patch('/salon-owner',
     (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
     salonOwnerControllers.update)

//get salon owner datas - route
router.get('/salon-owner',
     (req, res, next) => verifyAuth(req, res, next, "dont need permission"),
     getSalonOwnerByID)

export default router