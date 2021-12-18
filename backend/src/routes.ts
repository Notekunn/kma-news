import { Router } from 'express'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import categoryRouter from './routes/category'
const router = Router()

router.use('/users/', userRouter)
router.use('/auth/', authRouter)
router.use('/category/', categoryRouter)

export default router
