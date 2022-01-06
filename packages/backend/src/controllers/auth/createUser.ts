import { UserModel } from '@/models/user'
import { UserRole } from 'shared-types'

export const createUser = (
  email: string,
  password: string,
  role: UserRole = 'user',
  avatarURL?: string
) => {
  const user = new UserModel({
    email,
    password,
    role,
    avatarURL: avatarURL || 'https://i.pravatar.cc/300?u=' + email,
  })
  return user.save()
}

export const createUserIfNotExist = async (
  email: string,
  password: string,
  role: UserRole = 'user',
  avatarURL?: string
) => {
  const user = await UserModel.findOne({ email })
  if (user) return user
  return createUser(email, password, role, avatarURL)
}
