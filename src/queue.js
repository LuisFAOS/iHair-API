console.log("\nYour Queue is starting...")

import dotenv from "dotenv"
import path from "path"
import {
    fileURLToPath
} from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({
    path: path.resolve(__dirname, '.env')
})

import Queue from "./libs/queueBull/Queue.js"

Queue.process()

console.log("Your Queue is running!\n")