import Queue from 'bull'
import logger from './logger'
import VNExpress from './services/vnexpress'
import BaoChinhPhu from './services/baochinhphu'
import VietNamNet from './services/vietnamnet'

const vnexpress = new VNExpress()
const baochinhphu = new BaoChinhPhu()
const vietnamnet = new VietNamNet()

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

import Client from './client'
const client = Client.getInstance().client

// Tạo 1 queue nhận url để xử lý
export const crawlQueue = new Queue<string>('crawler', REDIS_URL, {
  settings: {},
})
// Tạo queue lấy các tin mới nhất
export const crawlLastedQueue = new Queue<string>('lasted', REDIS_URL)

crawlQueue.process('vnexpress', function (job, done) {
  vnexpress
    .getNewDetail(job.data)
    .then(vnexpress.updateDatabase)
    .then((e) => done(null, e))
    .catch((e) => done(e))
})
crawlQueue.process('baochinhphu', function (job, done) {
  baochinhphu
    .getNewDetail(job.data)
    .then(baochinhphu.updateDatabase)
    .then((e) => done(null, e))
    .catch((e) => done(e))
})

crawlQueue.process('vietnamnet', function (job, done) {
  vietnamnet
    .getNewDetail(job.data)
    .then(vietnamnet.updateDatabase)
    .then((e) => done(null, e))
    .catch((e) => done(e))
})

crawlQueue
  .on('failed', function (job, err) {
    logger(`Job ${job.id} in queue failed`, err, job)
  })
  .on('error', function (err) {
    logger('Queue Error:', err)
  })
  .on('completed', function (job, result) {
    logger(`${result.isNew ? 'Store' : 'Update'} post with id`, result._id)
  })

crawlLastedQueue.process('vnexpress', function (job, done) {
  vnexpress
    .getLastedNews()
    .then(vnexpress.lastedLinkFilter)
    .then((e) =>
      done(null, {
        host: 'vnexpress',
        data: e,
      })
    )
    .catch((e) => done(e))
})
crawlLastedQueue.process('baochinhphu', function (job, done) {
  baochinhphu
    .getLastedNews()
    .then(baochinhphu.lastedLinkFilter)
    .then((e) =>
      done(null, {
        host: 'baochinhphu',
        data: e,
      })
    )
    .catch((e) => done(e))
})
crawlLastedQueue.process('vietnamnet', function (job, done) {
  vietnamnet
    .getLastedNews()
    .then(vietnamnet.lastedLinkFilter)
    .then((e) =>
      done(null, {
        host: 'vietnamnet',
        data: e,
      })
    )
    .catch((e) => done(e))
})

crawlLastedQueue.on('completed', function (job, result) {
  // Thêm vào link mới
  result.data.forEach((e: string) => crawlQueue.add(result.host, e))
})