import QueueBull from "bull"
import redisConfig from "../../config/redis.js"

import * as jobs from "../../jobs/index.js"
import logger from "../../log/index.js"

const jobList = Object.keys(jobs).map(job => ({
     bull: new QueueBull(jobs[job].key, redisConfig),
     name: jobs[job].key,
     handle: jobs[job].handle,
     options: jobs[job].options
}))


const Queue = {
     jobList,
     add(name, data) {
          const queue = this.jobList.find(queue => queue.name === name)

          return queue.bull.add(data, queue.options)
     },
     process() {
          return this.jobList.forEach(queue => {
               queue.bull.process(queue.handle)

               queue.bull.on('failed', (job, error) => {
                    logger.error(`Job failed 👎, key: ${queue.key}, data: ${job.data}`)
                    logger.error("\nErro: ", error)
               })
          })
     }
}

export default Queue