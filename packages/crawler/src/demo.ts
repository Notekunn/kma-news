import VNExpress from './services/vnexpress'
import BaoChinhPhu from './services/baochinhphu'
import VietNamNet from './services/vietnamnet'
import TienPhong from './services/tienphong'
import mongoose from 'mongoose'
import VtcNews from './services/vtcNews'
const tienphong = new TienPhong()
const baochinhphu = new BaoChinhPhu()
const vnexpress = new VNExpress()
const vietnamnet = new VietNamNet()
const vtcnews = new VtcNews()
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

function main() {
  // baochinhphu
  //   .getNewDetail(
  //     'https://baochinhphu.vn/Tin-noi-bat/Nang-cao-hinh-anh-uy-tin-nghe-nghiep-dia-vi-cua-luat-su/457245.vgp'
  //   )
  //   .then(console.log)
  // tienphong
  //   .getNewDetail(
  //     'https://tienphong.vn/nha-bao-nguoi-maori-co-hinh-xam-tren-mat-dau-tien-tro-thanh-mc-dan-ban-tin-gio-vang-post1405172.tpo'
  //   )
  //   .then(console.log)
  vtcnews
    .getNewDetail(
      'https://vtc.vn/vu-di-ghe-hanh-ha-be-gai-8-tuoi-den-chet-tiet-lo-tu-nguoi-giup-viec-ar654422.html'
    )
    .then(console.log)
}
