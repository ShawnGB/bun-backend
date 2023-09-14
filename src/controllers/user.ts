import { prisma } from '../lib/prisma';
import { errorResponse } from '../utils/responses';
import { checkId, checkUserBody } from '../utils/validations';

const getAllUsers = () => prisma.user.findMany();

const createUser = async (userBody: UserCreateBody) => {
  const bodyError = await checkUserBody(userBody);
  if (bodyError) return bodyError;

  const hash = await Bun.password.hash(userBody.password);
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

const getUser = (id: string) =>
  checkId(id) || prisma.user.findUnique({ where: { id } });

const updateUser = async (id: string, body: UserUpdateBody) => {
  const error = checkId(id) || (await checkUserBody(body));
  if (error) return error;
  return prisma.user.update({ where: { id }, data: { ...body } });
};

const deleteUser = (id: string) =>
  checkId(id) || prisma.user.delete({ where: { id } });

export { createUser, getAllUsers, getUser, updateUser, deleteUser };
