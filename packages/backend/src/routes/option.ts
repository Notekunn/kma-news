import createOption from '@/controllers/option/create'
import getOneOption from '@/controllers/option/getOne'
import updateOption from '@/controllers/option/update'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { guardMiddleware } from '@/middlewares/guard-middleware'
import { Router } from 'express'
const router = Router()

router
  .post('/', authMiddleware, guardMiddleware('admin'), createOption)
  .get('/:name', getOneOption)
  .patch('/:name', authMiddleware, guardMiddleware('admin'), updateOption)

export default router
