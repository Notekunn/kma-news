import { UserModel } from '@/models/user'
import { User } from '@/@types'

function run() {
  const users: User[] = [
    {
      email: 'user1@gmail.com',
      name: 'User 1',
      password: 'password',
    },
  ]

  const user = new UserModel(users[0])
  return user.save()
}

run()
