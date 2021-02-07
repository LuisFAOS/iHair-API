import pino from "pino" 

const logger = pino({
    level: 'debug',
    prettyPrint: {
        levelFirst: true,
        colorize: true
    }
})

export default logger