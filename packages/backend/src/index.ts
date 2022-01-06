import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'
import errorHandler from './middlewares/error-handler'
import client from './redis'
import { load } from 'env-defaults'
const app = express()

const { PORT } = load({
  PORT: 8888,
})
app.use(helmet())
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)
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
  await mongoose.connect(
    process.env.DATABASE_URL ||
      'mongodb+srv://notekunn:6LK7xV8nxQmC@kmabot-rfffk.azure.mongodb.net/app?retryWrites=true&w=majority'
  )
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
