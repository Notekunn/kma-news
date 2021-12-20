import { Router } from 'express'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import categoryRouter from './routes/category'
import postRouter from './routes/post'
const router = Router()

router.use('/users/', userRouter)
router.use('/auth/', authRouter)
router.use('/category/', categoryRouter)
router.use('/posts/', postRouter)

export default router
