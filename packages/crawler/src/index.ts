import mongoose from 'mongoose'
import express from 'express'
import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import logger from './logger'
import VNExpress from './services/vnexpress'
const crawled_links: string[] = []
import queue from './queue'

const vnexpress = new VNExpress()

const serverAdapter = new ExpressAdapter()

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(queue)],
  serverAdapter,
})

async function main() {
  logger(`🚀 Start crawl news ....`)
  logger('⚓ Start crawl vnexpress...')
  //   queue.clean(1000, 'completed')
  const data = await vnexpress.getLastedNews()
  for (let i = 0; i < data.length; i++) {
    const { link } = data[i]
    if (!crawled_links.includes(link)) {
      crawled_links.push(link)
      queue.add('vnexpress', link)
    }
  }

  logger('⚓ Done crawl vnexpress...')
}
setInterval(main, 60 * 1000)

async function connectDatabase() {
  await mongoose.connect(
    process.env.DATABASE_URL ||
      'mongodb+srv://notekunn:6LK7xV8nxQmC@kmabot-rfffk.azure.mongodb.net/app?retryWrites=true&w=majority'
  )
  console.log('🔥Connect database success!')
  main()
}

connectDatabase().catch((e) => {
  console.log('🤦‍♂️Connect database error:', e.message)
})

const app = express()

serverAdapter.setBasePath('/admin')
app.use('/admin', serverAdapter.getRouter())
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('🚀 Crawler is running on port', PORT)
})
