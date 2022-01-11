import Queue from 'bull'
import logger from './logger'
import VNExpress from './services/vnexpress'
import BaoChinhPhu from './services/baochinhphu'
import VietNamNet from './services/vietnamnet'
import TienPhong from './services/tienphong'
import VtcNews from './services/vtcNews'

const vnexpress = new VNExpress()
const baochinhphu = new BaoChinhPhu()
const vietnamnet = new VietNamNet()
const tienphong = new TienPhong()
const vtcnews = new VtcNews()

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

export async function setUp() {
  await Promise.all([
    baochinhphu.setUp(),
    vnexpress.setUp(),
    tienphong.setUp(),
    vietnamnet.setUp(),
    vtcnews.setUp(),
  ])
}
// Tạo 1 queue nhận url để xử  - 2s / 1 request
export const crawlQueue = new Queue<string>('crawler', REDIS_URL, {
  settings: {},
  limiter: {
    max: 5,
    duration: 2000,
  },
})
crawlQueue.empty()

// Tạo queue lấy các tin mới nhất
export const crawlLastedQueue = new Queue<string>('lasted', REDIS_URL)
// crawlLastedQueue.empty()

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
crawlQueue.process('vtcnews', function (job, done) {
  vtcnews
    .getNewDetail(job.data)
    .then(vtcnews.updateDatabase)
    .then((e) => done(null, e))
    .catch((e) => done(e))
})
crawlQueue.process('tienphong', function (job, done) {
  tienphong
    .getNewDetail(job.data)
    .then(tienphong.updateDatabase)
    .then((e) => done(null, e))
    .catch((e) => done(e))
})

crawlQueue
  .on('failed', function (job, err) {
    // logger(`Job ${job.id} in queue failed`, err, job)
  })
  .on('error', function (err) {
    // logger('Queue Error:', err)
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
crawlLastedQueue.process('vtcnews', function (job, done) {
  vtcnews
    .getLastedNews()
    .then(vtcnews.lastedLinkFilter)
    .then((e) =>
      done(null, {
        host: 'tienphong',
        data: e,
      })
    )
    .catch((e) => done(e))
})
// crawlLastedQueue.process('tienphong', function (job, done) {
//   tienphong
//     .getLastedNews()
//     .then(tienphong.lastedLinkFilter)
//     .then((e) =>
//       done(null, {
//         host: 'tienphong',
//         data: e,
//       })
//     )
//     .catch((e) => done(e))
// })

crawlLastedQueue.on('completed', function (job, result) {
  // Thêm vào link mới
  result.data.forEach((e: string) => crawlQueue.add(result.host, e))
})
