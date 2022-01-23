import { UserModel } from '@/models/user'
import { IUser, ObjectWithID } from 'shared-types'

export async function run() {
  const users: ObjectWithID<IUser>[] = [
    {
      _id: '61bd9533706e03a795f2a64a',
      email: 'admin@gmail.com',
      name: 'Admin',
      password: 'password', // password
      role: 'admin',
    },
    {
      _id: '61e7860b915ad8dff81df0e2',
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
