import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}
import mongoose from 'mongoose'
import { load } from 'env-defaults'
import * as userSeed from './user'
import * as optionSeed from './option'
import * as publisherSeed from './publisher'

const { DATABASE_URL } = load({
  DATABASE_URL: 'mongodb://localhost:27017/app',
})
async function main() {
  console.log('🚀Connecting to database...')

  await mongoose.connect(DATABASE_URL)
  console.log('🚀Connect database successfully!')
  await userSeed.run()
  await optionSeed.run()
  await publisherSeed.run()
  mongoose.disconnect()
}

main().catch((err) => console.log(err))
