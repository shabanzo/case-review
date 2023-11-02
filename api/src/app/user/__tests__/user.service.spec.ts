import config from 'config';

import { signJwt } from '../../../utils/jwt';
import userModel, { User } from '../user.model';
import userService from '../user.service';

jest.mock('config', () => ({
  get: jest.fn(),
}));

jest.mock('../user.model', () => ({
  create: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
}));

jest.mock('../../../utils/jwt', () => ({
  signJwt: jest.fn(),
}));

jest.mock('../../../utils/redis', () => require('redis-mock'));

describe('User Service', () => {
  const testUser: Partial<User> = {
    name: 'testuser',
    email: 'testuser@example.com',
  };
  const createUser: Partial<User> = {
    ...testUser,
    password: 'password123',
  };

  beforeAll(() => {
    (userModel.create as jest.Mock).mockResolvedValue(testUser);
    (userModel.findById as jest.Mock).mockImplementationOnce(() => ({
      lean: jest.fn().mockReturnValue(testUser),
    }));
    (userModel.find as jest.Mock).mockResolvedValue([testUser]);
    (userModel.findOne as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(testUser),
    });
    (config.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'accessTokenExpiresIn') {
        return 15;
      }
    });
    (signJwt as jest.Mock).mockReturnValue('mockedToken');
  });

  it('should create a user', async () => {
    const createdUser = await userService.createUser(createUser);
    expect(createdUser).toMatchObject(testUser);
  });

  it('should find a user by ID', async () => {
    const foundUser = await userService.findUserById('123');
    expect(foundUser).toMatchObject(testUser);
  });

  it('should find all users', async () => {
    const users = await userService.findAllUsers();
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject(testUser);
  });

  it('should find a user by email', async () => {
    const query = { email: 'testuser@example.com' };
    const foundUser = await userService.findUser(query);
    expect(foundUser).toMatchObject(testUser);
  });
});
