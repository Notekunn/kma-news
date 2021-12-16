import { Router } from 'express'
import * as userController from '../controllers/user'
const router = Router()

router.get('/', userController.getAll)

router.post('/', userController.create)

export default router
