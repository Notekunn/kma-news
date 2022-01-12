import { Router } from 'express'
import docRouter from './routes/doc'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import categoryRouter from './routes/category'
import postRouter from './routes/post'
import publisherRouter from './routes/publisher'
const router = Router()

router.use('/', docRouter)
router.use('/users/', userRouter)
router.use('/auth/', authRouter)
router.use('/categories/', categoryRouter)
router.use('/posts/', postRouter)
router.use('/publishers/', publisherRouter)

export default router
