console.log("Your API is starting...")

import "express-async-errors"

import express from "express"
const app = express()

import cors from "cors"
import bodyParser from "body-parser"
import helmet from "helmet"
import compression from "compression"
import errorHandler from "./middlewares/errorHandler.js"

import normalUserRoutes from "./routes/normalUser.routes.js"
import emailConfirmationRoute from "./routes/emailConfirmation.route.js"
import salonRoutes from "./routes/salon.routes.js"
import salonOpeningHoursRoute from "./routes/salonOpeningHours.route.js"
import salonOwnerRoutes from "./routes/salonOwner.routes.js"
import salonServiceRoutes from "./routes/salonService.routes.js"
import clientScheduleRoutes from "./routes/clientSchedule.routes.js"

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())

app.use(normalUserRoutes)
app.use(emailConfirmationRoute)
app.use(salonRoutes)
app.use(salonOwnerRoutes)
app.use(salonServiceRoutes)
app.use(salonOpeningHoursRoute)
app.use(clientScheduleRoutes)

app.use(errorHandler)

app.listen(7070, () => console.log("Your API is running on: http://localhost:7070"))