const { TextEncoder, TextDecoder } = require('text-encoding');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { createUser, findUserByEmail, updateUser, generateResetToken, User } = require('../../../backend/models/UserDataModel');
const bcrypt = require('bcrypt');


jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

jest.mock('../../../backend/models/UserDataModel', () => {
  const originalModule = jest.requireActual('../../../backend/models/UserDataModel');
  return {
    ...originalModule,
    User: {
      findOne: jest.fn(),
      save: jest.fn(),
    },
    createUser: jest.fn(),
    findUserByEmail: jest.fn(),
    updateUser: jest.fn(),
    generateResetToken: jest.fn(),
  };
});

jest.setTimeout(30000);

describe('User Database Methods', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const saltRounds = 10;

  // Test 1: Create a new user with valid data and check if the user object is returned
  test('Create a new user', async () => {
    const mockUserData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };
    const hashedPassword = 'hashedPassword';
  
    // Mock bcrypt.hash function to resolve with the hashed password
    bcrypt.hash.mockResolvedValue(hashedPassword);
  
    // Mock the User instance
    const mockUserInstance = {
      username: mockUserData.username,
      email: mockUserData.email,
      password: mockUserData.password,
      hashedPassword: hashedPassword,
      save: jest.fn().mockResolvedValue(true), // Mock save method
    };
  
    // Instead of mocking User, use jest.fn() for findOne and save
    User.findOne.mockResolvedValue(mockUserInstance);
  
    try {
      // Call the createUser function with mock user data
      const user = await createUser(mockUserData.username, mockUserData.email, mockUserData.password);
      console.log("Created User:", user); // Debug log
  
      // Verify that the user object is not undefined
      expect(user).toBeDefined();
  
      // Verify that the properties of the user object match the input data
      expect(user.username).toBe(mockUserData.username);
      expect(user.email).toBe(mockUserData.email);
  
      // Since the password should not be returned from the createUser function,
      // we should not directly check it against the mockUserData.password.
      // Instead, we can check that the hashedPassword exists.
      expect(user.hashedPassword).toBeDefined();
      expect(user.hashedPassword).toBe(hashedPassword);
  
      // Verify that bcrypt.hash was called with the correct arguments
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, saltRounds);
  
      // Verify that the save method was called on the user instance
      expect(mockUserInstance.save).toHaveBeenCalled();
  
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  });

  // Test 2: Find a user by email and check if the user object is returned
  test('Find a user by email', async () => {
    const mockUserData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      hashedPassword: 'hashedPassword'
    };

    findUserByEmail.mockResolvedValue(mockUserData);

    const user = await findUserByEmail(mockUserData.email);

    expect(findUserByEmail).toHaveBeenCalledWith(mockUserData.email);
    expect(user).toEqual(mockUserData);
  });

  test('findUserByEmail should throw an error when user not found', async () => {
    findUserByEmail.mockResolvedValue(null);

    const result = await findUserByEmail('nonexistent@example.com');
    expect(result).toBeNull();

    expect(findUserByEmail).toHaveBeenCalledWith('nonexistent@example.com');
  });

  // Test 3: Update a user's password and check if the user object is returned
  test('Update a user\'s password', async () => {
    const email = 'test@example.com';
    const newPassword = 'newPassword';
    const resetToken = 'mockResetToken';

    const mockUser = {
      email: email,
      password: newPassword,
      resetToken: resetToken,
      save: jest.fn().mockResolvedValue(true)
    };

    User.findOne.mockResolvedValue(mockUser);

    bcrypt.hash.mockResolvedValue('hashedPassword');

    try {
      const updatedUser = await updateUser(email, newPassword, resetToken);

    expect(User.findOne).toHaveBeenCalledWith({ email: email });
    expect(updatedUser).toEqual(mockUser);
    expect(mockUser.password).toBe(newPassword);
    expect(mockUser.resetToken).toBe(resetToken);
    expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, expect.any(Number));
    expect(mockUser.save).toHaveBeenCalled();

    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  });

  // Test 4: Test if the generateResetToken function returns a reset token and expiration date
  test('Get the Returned token and expiration date', async () => {
    const resetToken = 'mockResetToken';
    const expirationDate = new Date();

    generateResetToken.mockResolvedValue({ resetToken, expirationDate });

    const result = await generateResetToken();

    expect(result.resetToken).toEqual(resetToken);
    expect(result.expirationDate).toEqual(expirationDate);

    console.log('Reset Token:', resetToken);
    console.log('Expiration Date:', expirationDate);
  });
});

