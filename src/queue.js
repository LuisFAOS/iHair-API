import logger from "./log/index.js"
logger.info("Your Queue is starting...")

import Queue from "./libs/queueBull/Queue.js"

Queue.process()

logger.info("Your Queue is running!\n")