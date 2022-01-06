import { errorWrapper } from '@/services/error-wrapper'
import { IController } from 'shared-types'
import axios from 'axios'

export const loginWithZalo: IController = errorWrapper(async (req, res, next) => {
  const { token } = req.query
  const { data } = await axios.post('https://graph.zalo.me/v2.0/oauth/access_token', {})
})
