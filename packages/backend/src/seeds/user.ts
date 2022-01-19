import { UserModel } from '@/models/user'
import { IUser } from 'shared-types'

export async function run() {
  const users: IUser[] = [
    {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: 'password', // password
      role: 'admin',
    },
    {
      email: 'user2@gmail.com',
      name: 'User 2',
      password: 'password', // password
      role: 'user',
    },
  ]
  try {
    console.log('🔃Star seed users...')
    for (const user of users) {
      const userData = await UserModel.findOne({ email: user.email })
      if (!userData) {
        const newUser = new UserModel(user)
        await newUser.save()
      }
    }
    console.log('✅Seed user successfully!')
  } catch (error: any) {
    console.log('❌Seed user failed: ' + error.message)
  }
}
