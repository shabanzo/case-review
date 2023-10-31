import { User } from '../user.model';
import userService from '../user.service';

jest.mock('../user.service', () => ({
  createUser: jest.fn(),
  findUserById: jest.fn(),
  findAllUsers: jest.fn(),
  findUser: jest.fn(),
  signToken: jest.fn(),
}));

describe('User Service', () => {
  const testUser: Partial<User> = {
    name: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  };

  beforeAll(() => {
    // Set up mock behavior for each function
    (userService.createUser as jest.Mock).mockResolvedValue(testUser);
    (userService.findUserById as jest.Mock).mockResolvedValue(testUser);
    (userService.findAllUsers as jest.Mock).mockResolvedValue([testUser]);
    (userService.findUser as jest.Mock).mockResolvedValue(testUser);
    (userService.signToken as jest.Mock).mockResolvedValue({
      accessToken: 'mockedToken',
    });
  });

  it('should create a user', async () => {
    const createdUser = await userService.createUser(testUser);
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

  it('should find a user by username', async () => {
    const query = { username: 'testuser' };
    const foundUser = await userService.findUser(query);
    expect(foundUser).toMatchObject(testUser);
  });

  it('should sign a token', async () => {
    const tokenResult = await userService.signToken(
      testUser.email || '',
      testUser.password || ''
    );
    expect(tokenResult.accessToken).toEqual('mockedToken');
  });
});
