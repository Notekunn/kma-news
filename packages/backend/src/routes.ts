import { Router } from 'express'
import docRouter from './routes/doc'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import categoryRouter from './routes/category'
import postRouter from './routes/post'
const router = Router()

router.use('/', docRouter)
router.use('/users/', userRouter)
router.use('/auth/', authRouter)
router.use('/category/', categoryRouter)
router.use('/posts/', postRouter)

export default router
