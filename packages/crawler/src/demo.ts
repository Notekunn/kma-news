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
  // vnexpress
  //   .getNewDetail(
  //     'https://vnexpress.net/chinh-phu-yeu-cau-khan-truong-mo-duong-bay-quoc-te-4406799.html'
  //   )
  //   .then(console.log)
  // baochinhphu
  //   .getNewDetail(
  //     'http://baochinhphu.vn/xa-hoi/khong-phai-cach-ly-y-te-voi-nguoi-nhap-canh-lam-viec-duoi-14-ngay/457101.vgp'
  //   )
  //   .then(console.log)
  vietnamnet
    .getNewDetail(
      'https://vietnamnet.vn/vn/phap-luat/ho-so-vu-an/pha-an-hang-nghin-bao-thuoc-la-lau-duoi-vo-boc-phong-chong-dich-covid-19-803982.html'
    )
    .then(console.log)
}
