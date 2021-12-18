import { Router } from 'express'
import * as categoryController from '../controllers/category'
const router = Router()

router.get('/', categoryController.getAll)

export default router
