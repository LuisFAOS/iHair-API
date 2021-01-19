async function ErrorHandler(error, req, res, next) {
     console.log(error)
     res.status(500).json({
          ErrorMessage: error.message
     })
}

export default ErrorHandler