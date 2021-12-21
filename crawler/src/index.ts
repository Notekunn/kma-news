import mongoose from 'mongoose'
import { logger } from './logger'
import VNExpress from './services/vnexpress'
import Queue from 'bull'
const crawled_links: string[] = []
const crawlQueue = new Queue<string>('vnexpress', 'redis://localhost:6379')

const vnexpress = new VNExpress()
const waitForResult = (ms: number) => {
  return (e: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(e), ms)
    })
  }
}
crawlQueue.process('vnexpress', function (job, done) {
  //   console.log('VNExpress', job.data)
  vnexpress
    .getNewDetail(job.data)
    .then(vnexpress.updateDatabase)
    .then((e) => done(null, e))
    .catch((e) => done(e))
})
crawlQueue.process('zing', function (job, done) {
  console.log('zing', job.data)
  //   done(null, { ahihi: 456 })
})
crawlQueue
  .on('failed', function (job, err) {
    logger(`Job ${job.id} in queue failed`, err)
  })
  .on('error', function (err) {
    logger('Queue Error:', err)
  })
  .on('completed', function (job, result) {
    logger('Store post with id:', result._id)
  })

async function main() {
  logger(`🚀 Start crawl news ....`)
  logger('⚓ Start crawl vnexpress...')
  crawlQueue.clean(1000, 'completed')
  const data = await vnexpress.getLastedNews()
  for (let i = 0; i < data.length; i++) {
    const { link } = data[i]
    if (!crawled_links.includes(link)) {
      crawled_links.push(link)
      crawlQueue.add('vnexpress', link)
    }
  }

  logger('⚓ Done crawl vnexpress...')
}
main()
setInterval(main, 60 * 1000)
async function connectDatabase() {
  await mongoose.connect(
    process.env.DATABASE_URL ||
      'mongodb+srv://notekunn:6LK7xV8nxQmC@kmabot-rfffk.azure.mongodb.net/app?retryWrites=true&w=majority'
  )
  console.log('🔥Connect database success!')
}

connectDatabase().catch((e) => {
  console.log('🤦‍♂️Connect database error:', e.message)
})
