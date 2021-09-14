import express, { NextFunction, Request, Response } from "express"

import * as salon from '../controllers/salonControllers/index'

import verifyAuth from "../middlewares/authHandler"
import verifyHasSalon from "../middlewares/verifySalonHandler"

const router = express.Router()


router.post('/salon', 
    (req:Request, res: Response, next: NextFunction) => verifyAuth(req, res, next, "salonOwner"),
    salon.create)

router.get('/salon',
    (req:Request, res: Response, next: NextFunction) => verifyAuth(req, res, next, "dont need permission"),
    salon.get
)

router.get('/salon/all',
    (req:Request, res: Response, next: NextFunction) => verifyAuth(req, res, next, "normalUser"),
    salon.getAll)

router.patch('/salon',
    (req:Request, res: Response, next: NextFunction) => verifyAuth(req, res, next, "salonOwner"),
    verifyHasSalon,
    salon.update)

router.patch('/salon-banner',
    (req:Request, res: Response, next: NextFunction) => verifyAuth(req, res, next, "salonOwner"),
    verifyHasSalon,
    salon.updateBanner)


export default router