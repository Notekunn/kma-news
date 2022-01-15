import getAllChannels from '@/controllers/channel/getAll'
import createChannel from '@/controllers/channel/create'
import updateChannel from '@/controllers/channel/update'
import deleteChannel from '@/controllers/channel/remove'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { Router } from 'express'

const router = Router()
router
  .get('/', authMiddleware, getAllChannels)
  .post('/', authMiddleware, createChannel)
  .patch('/:id', authMiddleware, updateChannel)
  .delete('/:id', authMiddleware, deleteChannel)
export default router
