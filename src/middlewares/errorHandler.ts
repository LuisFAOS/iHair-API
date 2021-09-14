import { Request, Response } from "express"
import logger from "../libs/pino"

async function ErrorHandler(error, req: Request, res: Response, next) {
     logger.error(error)
     res.status(500).json({
          ErrorMessage: error.message
     })
}

export default ErrorHandler