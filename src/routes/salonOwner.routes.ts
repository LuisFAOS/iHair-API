import express from "express"
const router = express.Router()

import * as salonOwnerControllers from "../controllers/salonOwnerControllers"
import {
     loginHandler,
     getSalonOwnerByID
} from "../controllers/salonOwnerControllers/getSalonOwner.controllers"

import verifyAuth from "../middlewares/authHandler"


//SingIn/Login salon owner - route
router.post('/salon-owner/login', loginHandler)

//SingUp salon owner - route
router.post('/salon-owner', salonOwnerControllers.create)

//update salon owner datas - route
router.patch('/salon-owner',
     (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
     salonOwnerControllers.update)


router.patch('/salon-owner-img',
     (req, res, next) => verifyAuth(req, res, next, "salonOwner"),
     salonOwnerControllers.updateImgs)

//get salon owner datas - route
router.get('/salon-owner',
     (req, res, next) => verifyAuth(req, res, next, "dont need permission"),
     getSalonOwnerByID)

export default router