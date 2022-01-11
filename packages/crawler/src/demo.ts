import BaoChinhPhu from './services/baochinhphu'
import VNExpress from './services/vnexpress'
// import VietNamNet from './services/vietnamnet'
// import TienPhong from './services/tienphong'
// import VtcNews from './services/vtcNews'
import mongoose from 'mongoose'
// const tienphong = new TienPhong()
const baochinhphu = new BaoChinhPhu()
const vnexpress = new VNExpress()
// const vietnamnet = new VietNamNet()
// const vtcnews = new VtcNews()
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
  baochinhphu
    .getNewDetail(
      'https://baochinhphu.vn/Chi-dao-quyet-dinh-cua-Chinh-phu-Thu-tuong-Chinh-phu/Bo-nhiem-lai-Pho-Tong-Giam-doc-Bao-hiem-xa-hoi-Viet-Nam/458452.vgp'
    )
    .then(console.log)
  // vnexpress
  //   .getNewDetail('https://vnexpress.net/viet-nam-phat-hien-ca-nhiem-omicron-dau-tien-4409186.html')
  //   .then(console.log)
  // tienphong
  //   .getNewDetail(
  //     'https://tienphong.vn/who-omicron-it-nguy-co-gay-benh-nang-nhung-khong-the-noi-la-nhe-post1407640.tpo'
  //   )
  //   .then(console.log)
}
