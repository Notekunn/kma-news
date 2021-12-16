import { Router } from 'express'
import userRouter from './routes/user'
import authRouter from './routes/auth'
const router = Router()

router.use('/users/', userRouter)
router.use('/auth/', authRouter)

export default router
