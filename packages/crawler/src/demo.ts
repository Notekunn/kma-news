import VNExpress from './services/vnexpress'
import BaoChinhPhu from './services/baochinhphu'
import VietNamNet from './services/vietnamnet'
import mongoose from 'mongoose'
const baochinhphu = new BaoChinhPhu()
const vnexpress = new VNExpress()
const vietnamnet = new VietNamNet()
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
  vietnamnet
    .getNewDetail(
      'http://vietnamnet.vn/vn/oto-xe-may/danh-gia-xe/thu-dam-tan-nat-xem-suv-dien-bmw-ix-an-toan-o-muc-nao-804548.html'
    )
    .then(console.log)
}
