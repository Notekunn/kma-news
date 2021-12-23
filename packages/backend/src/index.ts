import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'
import errorHandler from './middlewares/error-handler'

const app = express()

const { PORT = 8888 } = process.env

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/', routes)

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

connectDatabase().catch((e) => {
  console.log('🤦‍♂️Connect database error:', e.message)
})
