import config from 'config';
import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';

import AppError from '../../utils/appError';
import { signJwt } from '../../utils/jwt';
import redisClient from '../../utils/redis';
import { excludedFields } from './user.interface';
import userModel, { User } from './user.model';

// Create User
const createUser = async (userData: Partial<User>) => {
  const user = await userModel.create(userData);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find all Users
const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

// Sign token
const signToken = async (email: string, password: string) => {
  const user = await findUser({ email });

  if (!user || !(await user.comparePasswords(user.password, password))) {
    throw new AppError(401, 'Invalid email or password');
  }

  const accessToken = signJwt(
    { sub: user._id },
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );

  redisClient.set(user._id.toString(), JSON.stringify(user), {
    EX: 60 * 60,
  });

  return { accessToken };
};

export default {
  createUser,
  findUserById,
  findAllUsers,
  findUser,
  signToken,
};
