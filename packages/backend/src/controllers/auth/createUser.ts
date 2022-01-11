import { UserModel } from '@/models/user'
import { UserRole } from 'shared-types'

export const createUser = (
  email: string,
  password: string,
  name: string,
  role: UserRole = 'user',
  avatarURL?: string
) => {
  const user = new UserModel({
    email,
    password,
    name,
    role,
    avatarURL: avatarURL || 'https://i.pravatar.cc/300?u=' + email,
  })
  return user.save()
}

export const createUserIfNotExist = async (
  email: string,
  password: string,
  name: string,
  role: UserRole = 'user',
  avatarURL?: string
) => {
  const user = await UserModel.findOne({
    email,
  })
  if (user) return user
  return await createUser(email, password, name, role, avatarURL)
}
