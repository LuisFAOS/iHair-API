import QueueBull from "bull"
import redisConfig from "../../config/redis"
import iEmailData from "../../globalInterfaces/emailData"

import * as jobs from "../../jobs/index"
import logger from "../../libs/pino"

const jobList = Object.keys(jobs).map(job => ({
     bull: new QueueBull(jobs[job].key, redisConfig),
     name: jobs[job].key,
     handle: jobs[job].handle,
     options: jobs[job].options
}))


const Queue = {
     jobList,
     add(name: string, data:{emailData: iEmailData}) {
          const queue = this.jobList.find(queue => queue.name === name)

          return queue.bull.add(data, queue.options)
     },
     process() {
          return this.jobList.forEach(queue => {
               logger.info("Job started: "+queue.name)
               queue.bull.process(queue.handle)
               queue.bull.on('failed', (job, error) => {
                    logger.error(`Job failed 👎, key: ${queue.key}, data: ${job.data}`)
                    logger.error("\nErro: ", error)
               })
          })
     }
}

export default Queue
