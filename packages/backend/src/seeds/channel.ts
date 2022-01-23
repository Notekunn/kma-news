import { ChannelModel } from '@/models/channel'
import channels from './data/channels'

export async function run() {
  try {
    console.log('🔃Star seed publishers...')
    for (const channel of channels) {
      await ChannelModel.findByIdAndUpdate(
        channel._id,
        {
          ...channel,
        },
        { upsert: true }
      )
    }

    console.log('✅Seeding channels success')
  } catch (error: any) {
    console.log('❌Seeding channels failed: ' + error.message)
  }
}
