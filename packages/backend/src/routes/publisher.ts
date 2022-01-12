import { Router } from 'express'
import getAll from '@/controllers/publisher/getAll'

const router = Router()

router.get('/', getAll)

export default router
