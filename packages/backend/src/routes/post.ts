import { authMiddleware } from '@/middlewares/auth-middleware'
import { guardMiddleware } from '@/middlewares/guard-middleware'
import { Router } from 'express'
import getAllPost from '../controllers/post/getAll'
import createPost from '../controllers/post/create'
import getPostBySlug from '../controllers/post/getBySlug'
import updatePost from '../controllers/post/update'
import deletePost from '../controllers/post/remove'

const router = Router()

router.get('/', getAllPost)

router.post('/', authMiddleware, guardMiddleware('writter'), createPost)

router.get('/:slug', getPostBySlug)

router.patch('/:id', authMiddleware, guardMiddleware('writter'), updatePost)

router.delete('/:id', authMiddleware, guardMiddleware('writter'), deletePost)

export default router
