import logger from "../log/index.js"

async function ErrorHandler(error, req, res, next) {
     logger.error(error)
     res.status(500).json({
          ErrorMessage: error.message
     })
}

export default ErrorHandler