import mongoose from 'mongoose'
import express from 'express'
import { crawlQueue, crawlLastedQueue, setUp } from './queue'
import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import logger from './logger'
import Client from './client'
const client = Client.getInstance().client
const serverAdapter = new ExpressAdapter()

console.log(process.env.REDIS_URL)

createBullBoard({
  queues: [new BullAdapter(crawlQueue), new BullAdapter(crawlLastedQueue)],
  serverAdapter,
})

async function main() {
  await client.connect()
  logger(`🚀 Start crawl news ....`)
  // Thêm các tác vụ crawl lasted new
  // cron tab chạy 1 phút 1 lần
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
  crawlLastedQueue.add('vtcnews', '', {
    repeat: {
      cron: '* * * * *',
    },
  })
  crawlLastedQueue.add('tienphong', '', {
    repeat: {
      cron: '* * * * *',
    },
  })
}
// mongodb+srv://notekunn:6LK7xV8nxQmC@kmabot-rfffk.azure.mongodb.net/app?retryWrites=true&w=majority
async function connectDatabase() {
  await mongoose.connect(
    process.env.DATABASE_URL ||
      'mongodb://admin:admin@188.166.246.99:27017/app?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
  )
  console.log('🔥Connect database success!')
  await setUp()
  console.log('🔥Set up success!')
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
