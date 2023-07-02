import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatorUserId } from './user.utils';

const createUsers = async (user: IUser): Promise<IUser | null> => {
  const id = await generatorUserId();

  user.id = id;

  if (!user.password) {
    user.password = config.custom_user_pass as string;
  }

  const createUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user');
  }

  return createUser;
};

export const UserService = {
  createUsers,
};
