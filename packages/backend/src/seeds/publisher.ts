import { PublisherModel } from '@/models/publisher'
import publishers from './data/publisher'

export async function run() {
  try {
    console.log('🔃Star seed publishers...')
    for (const publisher of publishers) {
      await PublisherModel.findOneAndUpdate(
        {
          hostname: publisher.hostname,
        },
        {
          ...publisher,
        },
        { upsert: true }
      )
    }

    console.log('✅Seeding publishers success')
  } catch (error: any) {
    console.log('❌Seeding publishers failed: ' + error.message)
  }
}
