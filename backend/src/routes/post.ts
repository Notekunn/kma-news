import { authMiddleware } from '@/middlewares/auth-middleware'
import { guardMiddleware } from '@/middlewares/guard-middleware'
import { Router } from 'express'
import * as postController from '../controllers/post'
const router = Router()

router.get('/', postController.getAll)

router.post('/', authMiddleware, guardMiddleware('writter'), postController.create)

router.get('/:slug', postController.getBySlug)

router.patch('/:id', authMiddleware, guardMiddleware('writter'), postController.update)

router.delete('/:id', authMiddleware, guardMiddleware('writter'), postController.remove)

export default router
