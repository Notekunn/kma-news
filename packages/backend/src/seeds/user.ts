import { UserModel } from '@/models/user'
import { IUser } from 'shared-types'

export async function run() {
  const users: IUser[] = [
    {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: 'password',
      role: 'admin',
    },
    {
      email: 'user2@gmail.com',
      name: 'User 2',
      password: 'password',
      role: 'user',
    },
  ]
  try {
    await UserModel.deleteMany({})
    await Promise.all(users.map((user) => new UserModel(user).save()))
  } catch (error: any) {
    return error.message
  }
}
