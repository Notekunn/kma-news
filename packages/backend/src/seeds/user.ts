import { UserModel } from '@/models/user'
import { User } from '@/@types'

export async function run() {
  const users: User[] = [
    {
      email: 'user1@gmail.com',
      name: 'User 1',
      password: 'password',
    },
    {
      email: 'user2@gmail.com',
      name: 'User 2',
      password: 'password',
    },
  ]
  try {
    await UserModel.deleteMany({})
    await Promise.all(users.map((user) => new UserModel(user).save()))
  } catch (error: any) {
    return error.message
  }
}
