import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routes from './routes'
import errorHandler from './middlewares/error-handler'
import client from './redis'
import dotenv from 'dotenv'
import { load } from 'env-defaults'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}
const app = express()

const { PORT, BACKEND_HOST, FRONTEND_HOST, ADMIN_HOST, DATABASE_URL } = load({
  PORT: 8888,
  BACKEND_HOST: 'api.kma-news.tech',
  FRONTEND_HOST: 'kma-news.tech',
  ADMIN_HOST: 'admin.kma-news.tech',
  DATABASE_URL: 'mongodb://localhost:27017/app',
})

let origin = ['http://localhost:3000', 'http://localhost:3001', 'https://kma-news.herokuapp.com']
if (process.env.NODE_ENV === 'production') {
  const deployHost = [BACKEND_HOST, FRONTEND_HOST, ADMIN_HOST].map((domain) => [
    `http://${domain}`,
    `https://${domain}`,
  ])
  origin = origin.concat(...deployHost)
}
console.log('Origin:', origin)

app.use(helmet())
app.use(
  cors({
    origin,
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json())
app.use('/', routes)
app.get('/zalo_verifier*', (req, res) => {
  res.sendFile('./docs/zalo.html', { root: __dirname })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('🚀App listening on port ' + PORT)
})

async function connectDatabase() {
  await mongoose.connect(DATABASE_URL)
  console.log('🔥Connect database success!')
}
async function connectRedis() {
  await client.connect()
  console.log('🚀Connect redis success!')
}

connectDatabase().catch((e) => {
  console.log('❌Connect database error:', e.message)
})
connectRedis().catch((e) => {
  console.log('❌Connect cache server error:', e.message)
})
