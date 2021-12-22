import VNExpress from './services/vnexpress'
import mongoose from 'mongoose'
const vnexpress = new VNExpress()
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
  vnexpress
    .getNewDetail(
      'https://vnexpress.net/chinh-phu-yeu-cau-khan-truong-mo-duong-bay-quoc-te-4406799.html'
    )
    .then(console.log)
}
