import { Router } from 'express'
import * as userController from '@/controllers/auth'
const router = Router()

router.post('/login', userController.login)
router.post('/refresh', userController.refreshToken)

export default router
