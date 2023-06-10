import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generatorUserId } from './users.utils'

const createUsers = async (user: IUser): Promise<IUser | null> => {
  // auto generator Id
  // custom student password

  const id = await generatorUserId()

  user.id = id

  if (!user.password) {
    user.password = config.custom_user_pass as string
  }

  const createUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create user')
  }

  return createUser
}

export default {
  createUsers,
}
