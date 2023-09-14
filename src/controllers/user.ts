import { prisma } from '../lib/prisma';
import { errorResponse } from '../utils/responses';
import { checkId, checkUserBody } from '../utils/validations';

const getAllUsers = () => prisma.user.findMany();

const getUser = (id: string) =>
  checkId(id) || prisma.user.findUnique({ where: { id } });

const updateUser = async (body: UserUpdateBody) => {
  const { id, ...restOfBody } = body;
  const error = await checkUserBody(body);
  if (error) return error;
  return prisma.user.update({ where: { id }, data: { ...restOfBody } });
};

const deleteUser = (id: string) =>
  checkId(id) || prisma.user.delete({ where: { id } });

export { getAllUsers, getUser, updateUser, deleteUser };
