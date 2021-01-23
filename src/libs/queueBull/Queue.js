import QueueBull from "bull"
import redisConfig from "../../config/redis.js"

import * as jobs from "../../jobs/index.js"

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
                    console.log("Job failed 👎", queue.key, job.data)
                    console.log("\nErro: ", error)
               })
          })
     }
}

export default Queue