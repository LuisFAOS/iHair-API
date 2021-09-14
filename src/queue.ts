import dotenv from 'dotenv'

dotenv.config()

import logger from "./libs/pino"
logger.info("Your Queue is starting...")

import Queue from "./libs/Queue"

Queue.process()

logger.info("Your Queue is running!\n")