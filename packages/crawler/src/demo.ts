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
  vnexpress
    .getNewDetail('https://vnexpress.net/viet-nam-phat-hien-ca-nhiem-omicron-dau-tien-4409186.html')
    .then(console.log)
}
