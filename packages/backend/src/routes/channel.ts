import getAllChannels from '@/controllers/channel/getAll'
import createChannel from '@/controllers/channel/create'
import updateChannel from '@/controllers/channel/update'
import deleteChannel from '@/controllers/channel/remove'
import getOneChannel from '@/controllers/channel/getOne'
import contentByChannel from '@/controllers/channel/contentByChannel'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { Router } from 'express'

const router = Router()
router
  .get('/', authMiddleware, getAllChannels)
  .post('/', authMiddleware, createChannel)
  .get('/:id', authMiddleware, getOneChannel)
  .patch('/:id', authMiddleware, updateChannel)
  .delete('/:id', authMiddleware, deleteChannel)
  .get('/:id/content', contentByChannel)
export default router
