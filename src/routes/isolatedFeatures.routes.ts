import express from 'express'
const router = express.Router()

import handleVerificationCode from '../controllers/handleVerificationCode.controller.ts'

router.post('/handle-verification-code', handleVerificationCode)

