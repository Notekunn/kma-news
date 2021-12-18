import { authMiddleware } from '@/middlewares/auth-middleware'
import { guardMiddleware } from '@/middlewares/guard-middleware'
import { Router } from 'express'
import * as categoryController from '../controllers/category'
const router = Router()

router.get('/', categoryController.getAll)

router.post('/', authMiddleware, guardMiddleware('admin'), categoryController.create)

export default router
