import { Router } from 'express'
import * as userController from '../controllers/user'
import { authMiddleware } from '@/middlewares/auth-middleware'
const router = Router()

router.get('/', userController.getAll)

router.post('/', userController.create)

router.get('/me', authMiddleware, userController.me)

export default router
