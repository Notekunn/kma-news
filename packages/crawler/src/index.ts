import mongoose from 'mongoose'
import express from 'express'
import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import logger from './logger'
import { crawlQueue, crawlLastedQueue } from './queue'

const serverAdapter = new ExpressAdapter()

createBullBoard({
  queues: [new BullAdapter(crawlQueue), new BullAdapter(crawlLastedQueue)],
  serverAdapter,
})

function main() {
  logger(`🚀 Start crawl news ....`)

  crawlLastedQueue.add('vnexpress', '', {
    repeat: {
      cron: '* * * * *',
    },
  })
  crawlLastedQueue.add('baochinhphu', '', {
    repeat: {
      cron: '* * * * *',
    },
  })
  crawlLastedQueue.add('vietnamnet', '', {
    repeat: {
      cron: '* * * * *',
    },
  })
}
// setInterval(main, 60 * 1000)

async function connectDatabase() {
  await mongoose.connect(
    process.env.DATABASE_URL ||
      'mongodb+srv://notekunn:6LK7xV8nxQmC@kmabot-rfffk.azure.mongodb.net/app?retryWrites=true&w=majority'
  )
  console.log('🔥Connect database success!')
  main()
}

connectDatabase().catch((e) => {
  console.log('🤦‍♂️ Connect database error:', e.message)
})

const app = express()

serverAdapter.setBasePath('/admin')
app.use('/admin', serverAdapter.getRouter())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('🚀 Crawler is running on port', PORT)
})
