import { createClient } from 'redis'
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

export default class Client {
  private static instance: Client
  client: ReturnType<typeof createClient>

  private constructor() {
    this.client = createClient({
      url: REDIS_URL,
    })
    this.client.on('error', (err: any) => {
      console.log('Redis client error ', err)
    })
  }

  static getInstance() {
    if (!Client.instance) {
      Client.instance = new Client()
    }
    return Client.instance
  }
}
