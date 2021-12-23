import * as userSeed from './user'
import mongoose from 'mongoose'

async function main() {
  console.log('🚀Connecting to database...')

  await mongoose.connect(process.env.DATABASE_URL || '')
  console.log('🚀Connect database successfully!')
  let error = await userSeed.run()
  if (!error) console.log('🚀Seed user successfully!')
  else console.log('❌Seed user failed: ' + error)
  mongoose.disconnect()
}

main().catch((err) => console.log(err))
