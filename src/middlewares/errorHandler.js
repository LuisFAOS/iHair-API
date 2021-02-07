import logger from "../log"

async function ErrorHandler(error, req, res, next) {
     logger.error(error)
     res.status(500).json({
          ErrorMessage: error.message
     })
}

export default ErrorHandler