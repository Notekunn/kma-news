import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerOption from '@/docs/swagger'

const router = Router()

const specs = swaggerJSDoc(swaggerOption)

router.use('/', swaggerUi.serve)

router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: false,
  })
)

export default router
