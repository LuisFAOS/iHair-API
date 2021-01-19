import express from "express"
const router = express.Router()

import * as normalUserControllers from "../controllers/normalUserControllers/index.js"
import {
    getUserByID,
    loginHandler
} from "../controllers/normalUserControllers/getNormalUserControllers.js"

import verifyAuth from "../middlewares/authHandler.js"


//SingIn User Route
router.get('/normal-user/login', loginHandler)

//SingUp User Route
router.post('/normal-user', normalUserControllers.create)

//get User Route
router.get('/normal-user/listDatas',
    (req, res, next) => verifyAuth(req, res, next, "normalUser"), getUserByID)

//Delete User Route
router.delete('/normal-user', normalUserControllers.delete)

//Update User Route
router.patch('/normal-user', normalUserControllers.update)

export default router