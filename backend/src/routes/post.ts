import { authMiddleware } from '@/middlewares/auth-middleware'
import { guardMiddleware } from '@/middlewares/guard-middleware'
import { Router } from 'express'
import * as postController from '../controllers/post'
const router = Router()

router.get('/', postController.getAll)

router.post('/', postController.create)

export default router
