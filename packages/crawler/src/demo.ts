import BaoChinhPhu from './services/baochinhphu'
import VNExpress from './services/vnexpress'
import TienPhong from './services/tienphong'
import VietNamNet from './services/vietnamnet'
import VtcNews from './services/vtcNews'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const baochinhphu = new BaoChinhPhu()
const vnexpress = new VNExpress()
const tienphong = new TienPhong()
const vietnamnet = new VietNamNet()
const vtcnews = new VtcNews()
async function connectDatabase() {
  await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/app')
  console.log('🔥Connect database success!')
  await setUp()
  main()
}

connectDatabase().catch((e) => {
  console.log('🤦‍♂️Connect database error:', e.message)
})
async function setUp() {
  await Promise.all([
    baochinhphu.setUp(),
    vnexpress.setUp(),
    tienphong.setUp(),
    vietnamnet.setUp(),
    vtcnews.setUp(),
  ])
}
function main() {
  // baochinhphu
  //   .getNewDetail(
  //     'https://baochinhphu.vn/Chi-dao-quyet-dinh-cua-Chinh-phu-Thu-tuong-Chinh-phu/Bo-nhiem-lai-Pho-Tong-Giam-doc-Bao-hiem-xa-hoi-Viet-Nam/458452.vgp'
  //   )
  //   .then(console.log)
  vnexpress
    .getNewDetail('https://vnexpress.net/bidv-tang-thuong-voi-tong-gia-tri-65-ty-dong-4415096.html')
    .then(console.log)
  // tienphong
  //   .getNewDetail(
  //     'https://tienphong.vn/who-omicron-it-nguy-co-gay-benh-nang-nhung-khong-the-noi-la-nhe-post1407640.tpo'
  //   )
  //   .then(console.log)
  // vietnamnet
  //   .getNewDetail(
  //     'https://vietnamnet.vn/vn/giai-tri/phim/tuoi-xe-chieu-cua-chi-tu-hau-nsnd-tra-giang-song-mot-minh-con-gai-thanh-dat-o-nuoc-ngoai-808183.html'
  //   )
  //   .then(console.log)
  // vtcnews
  //   .getNewDetail(
  //     'https://vtc.vn/tan-hoang-minh-xin-bo-coc-lo-dat-dau-gia-o-thu-thiem-ar656678.html'
  //   )
  //   .then(console.log)
}
