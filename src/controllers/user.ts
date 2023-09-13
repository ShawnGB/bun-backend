import { prisma } from '../lib/prisma';

interface UserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  id?: string;
  password: string;
}

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getUser = async (id: string) => {
  if (!id) return;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const createUser = async (userBody: UserRequestBody) => {
  const { firstName, lastName, email, password } = userBody;

  const hash = await Bun.password.hash(password);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hash,
    },
  });

  return user;
};

const updateUser = async (id: string, userBody: UserRequestBody) => {
  const { firstName, lastName, email } = userBody;

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      email,
    },
  });

  return user;
};

const deleteUser = async (id: string) => {
  if (!id) return;

  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
};

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
