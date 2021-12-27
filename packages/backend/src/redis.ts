import { createClient } from 'redis'

const client = createClient({
  url: process.env.URL,
})

export default client
