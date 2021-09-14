import "express-async-errors"

import dotenv from 'dotenv'

dotenv.config()

import pinoHttp from "pino-http"
import http from 'http'

import logger from "./libs/pino"

const pinoMiddleware = pinoHttp({logger})
logger.info("Your API is starting...")

import socket from "socket.io";
import express, { json, Request, Response, urlencoded } from "express"
import startSocket from './socket.io'
const app = express()

import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import errorHandler from "./middlewares/errorHandler"

import normalUserRoutes from "./routes/normalUser.routes"
import emailConfirmationRoute from "./routes/email.routes"
import salonRoutes from "./routes/salon.routes"
import salonBusinessHoursRoutes from "./routes/salonBusinessHours.routes"
import salonOwnerRoutes from "./routes/salonOwner.routes"
import salonServiceRoutes from "./routes/salonService.routes"
import clientScheduleRoutes from "./routes/clientSchedule.routes"
import salonRatingRoutes from "./routes/salonRating.routes"


app.use(cors())
app.use(urlencoded({
    extended: false
})) 
app.use(helmet())
app.use(compression())
app.use(json({limit: '10mb'}))
app.use(pinoMiddleware)

app.use(normalUserRoutes)
app.use(emailConfirmationRoute)
app.use(salonRoutes)
app.use(salonOwnerRoutes)
app.use(salonServiceRoutes)
app.use(salonBusinessHoursRoutes)
app.use(clientScheduleRoutes)
app.use(salonRatingRoutes)

app.use(errorHandler)

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello, World!")
})

const HTTPserver = http.createServer(app);
const io = new socket.Server(HTTPserver,{
    cors: {
      origin: "http://localhost:3000",
    },
})
startSocket(io)

HTTPserver.listen(process.env.APP_PORT, () => logger.info("Your API is running on: http://localhost:"+process.env.APP_PORT))
