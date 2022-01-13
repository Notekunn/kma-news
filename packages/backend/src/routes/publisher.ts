import { Router } from 'express'
import getAllPublishers from '@/controllers/publisher/getAll'
import createPublisher from '@/controllers/publisher/create'
import updatePublisher from '@/controllers/publisher/update'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { guardMiddleware } from '@/middlewares/guard-middleware'

const router = Router()

router
  .get('/', getAllPublishers)
  .post('/', authMiddleware, guardMiddleware('admin'), createPublisher)
  .patch('/:id', authMiddleware, guardMiddleware('admin'), updatePublisher)
//   .delete('/:id', deletePublisher)

export default router
