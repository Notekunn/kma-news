import { OptionModel } from '@/models/option'
import headerCategories from './data/categories'
const headerMenu = [
  {
    name: 'Nóng',
    path: '/',
  },
  {
    name: 'Mới',
    path: '/tin-moi',
  },
  {
    name: 'Chủ đề',
    path: '/chu-de',
  },
] as const
const headerTag = [
  {
    name: 'Phòng chống dịch covid',
    path: '/',
  },
  {
    name: 'Năng lượng tích cực',
    path: '/',
  },
  {
    name: 'Khám phá Việt Nam',
    path: '/',
  },
  {
    name: 'Khám phá thế giới',
    path: '/',
  },
] as const
export async function run() {
  try {
    console.log('🔃Star seeding options...')
    const headerMenuOption = await OptionModel.findOneAndUpdate(
      {
        name: 'header.menu',
      },
      {
        value: JSON.stringify(headerMenu),
      },
      {
        new: true,
        upsert: true,
      }
    )
    if (!!headerMenuOption) console.log('    ✅Seeding header menu success')
    const headerTagOption = await OptionModel.findOneAndUpdate(
      {
        name: 'header.tag',
      },
      {
        value: JSON.stringify(headerTag),
      },
      {
        new: true,
        upsert: true,
      }
    )
    if (!!headerTagOption) console.log('    ✅Seeding header tag success')
    const headerCategoriesOption = await OptionModel.findOneAndUpdate(
      {
        name: 'header.category',
      },
      {
        value: JSON.stringify(headerCategories),
      },
      {
        new: true,
        upsert: true,
      }
    )
    if (!!headerCategoriesOption) console.log('    ✅Seeding header categories success')
    const channelLastestOption = await OptionModel.findOneAndUpdate(
      {
        name: 'channel.lastest',
      },
      {
        value: '61ecf85b0067100d8177dd6d',
      },
      {
        new: true,
        upsert: true,
      }
    )
    if (!!channelLastestOption) console.log('    ✅Seeding channel lastest success')
    console.log('✅Seeding options success')
  } catch (error: any) {
    console.log('❌Seeding options failed: ' + error.message)
  }
}
