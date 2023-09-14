import { prisma } from '../lib/prisma';
import { isValidEmail, doesUserExist } from '../utils/validations';
import { errorResponse } from '../utils/responses';

const getAllUsers = async () => prisma.user.findMany();

const getUser = async (id: string) => {
  if (!id) {
    return errorResponse('Missing id.');
  }
  return prisma.user.findUnique({ where: { id } });
};

const updateUser = async (id: string, body: UserRequestBody) => {
  if (!id) {
    return errorResponse('Missing id.');
  }
  return prisma.user.update({
    where: { id },
    data: { ...body },
  });
};

const deleteUser = async (id: string) => {
  if (!id) {
    return errorResponse('Missing id.');
  }
  return prisma.user.delete({ where: { id } });
};

const createUser = async (userBody: UserRequestBody) => {
  const { email, userName, password } = userBody;

  if (!isValidEmail(email)) {
    return errorResponse('Invalid email address.');
  }

  if (await doesUserExist('email', email)) {
    return errorResponse('Email address already in use.');
  }

  if (await doesUserExist('userName', userName)) {
    return errorResponse('User name already in use.');
  }

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

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
