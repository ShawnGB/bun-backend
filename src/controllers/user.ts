import { prisma } from '../lib/prisma';
import { isValidEmail } from '../utils/validations';
import { errorResponse } from '../utils/responses';
import { doesUserExist } from '../utils/validations';

interface UserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  summary?: string;
  profileImage?: string;
}

//  get all users
const getAllUsers = async () => await prisma.user.findMany();

// get a user by id
const getUser = async (id: string) =>
  id ? await prisma.user.findUnique({ where: { id } }) : null;

// create an new user
const createUser = async (userBody: UserRequestBody) => {
  const { email, userName, password } = userBody;

  // validations before creating a user
  if (!isValidEmail(email)) {
    return errorResponse('Invalid email address.');
  }

  if (await doesUserExist('email', email)) {
    return errorResponse('Email address already in use.');
  }

  if (await doesUserExist('userName', userName)) {
    return errorResponse('User name already in use.');
  }

  //create a user
  const hash = await Bun.password.hash(password);
  const user = await prisma.user.create({
    data: { ...userBody, password: hash },
  });

  return user
    ? {
        success: true,
        data: user,
        message: 'User created successfully.',
      }
    : errorResponse('User could not be created.');
};

// update a user
const updateUser = async (id: string, body: UserRequestBody) => {
  id
    ? await prisma.user.update({
        where: { id },
        data: { ...body },
      })
    : errorResponse('Missing id.');
};

// delete a user
const deleteUser = async (id: string) =>
  id
    ? await prisma.user.delete({ where: { id } })
    : errorResponse('Missing id.');

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
