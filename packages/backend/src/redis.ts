import { load } from 'env-defaults'
import { createClient } from 'redis'
const { REDIS_URL } = load({
  REDIS_URL: 'redis://localhost:6379',
})
const client = createClient({
  url: REDIS_URL,
})

export default client
