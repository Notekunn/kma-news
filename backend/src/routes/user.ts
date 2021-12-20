import { Router } from 'express'
import * as userController from '../controllers/user'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { guardMiddleware } from '@/middlewares/guard-middleware'
const router = Router()

router.get('/', authMiddleware, guardMiddleware('admin'), userController.getAll)

router.post('/', userController.create)

router.get('/:id', authMiddleware, userController.getOne)

router.patch('/:id', authMiddleware, userController.update)

router.delete('/:id', authMiddleware, userController.remove)

router.get('/me', authMiddleware, userController.me)

export default router
