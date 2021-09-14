import express from "express"
const router = express.Router()

import * as normalUserControllers from "../controllers/normalUserControllers"
import {
    getUserByID,
    loginHandler
} from "../controllers/normalUserControllers/getNormalUser.controllers"

import verifyAuth from "../middlewares/authHandler"


//SingIn User Route
router.post('/normal-user/login', loginHandler)

//SingUp User Route
router.post('/normal-user', normalUserControllers.create)

//get User Route
router.get('/normal-user',
    (req, res, next) => verifyAuth(req, res, next, "normalUser"), getUserByID)

//Delete User Route
router.delete('/normal-user', normalUserControllers.delete)

//Update User Route
router.patch('/normal-user', normalUserControllers.update)

//update password 
router.patch('/normal-user/new-password', normalUserControllers.newPassword)

export default router
