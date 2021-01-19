import express from "express"
import emailConfirmationHandler from "../controllers/emailConfirmation.controller.js"

const router = express.Router()

router.get("/verify-email", emailConfirmationHandler)

export default router