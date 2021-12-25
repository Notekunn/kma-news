import Queue from 'bull'
import logger from './logger'
import VNExpress from './services/vnexpress'
import BaoChinhPhu from './services/baochinhphu'
import VietNamNet from './services/vietnamnet'

const vnexpress = new VNExpress()
const baochinhphu = new BaoChinhPhu()
const vietnamnet = new VietNamNet()

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
// Tạo 1 queue nhận url để xử lý
const crawlQueue = new Queue<string>('crawler', REDIS_URL)

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

export default crawlQueue
