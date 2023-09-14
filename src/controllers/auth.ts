import { prisma } from '../lib/prisma';
import { errorResponse } from '../utils/responses';
import { checkUserBody } from '../utils/validations';

const login = async ({ email, password }: LoginBody) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return errorResponse('No user found with that email address.');

  const validate = await Bun.password.verify(password, user.password);

  if (!validate) return errorResponse('Invalid password.');

  return {
    success: true,
    data: user,
    message: 'User logged in successfully.',
  };
};

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

const validateUser = async () => {};

export { createUser, login, validateUser };
