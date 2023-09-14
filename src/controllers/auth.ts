import { prisma } from '~/libs/prisma';
import { errorResponse } from '~/utils/responses';
import { checkUserBody } from '~/utils/validations';

type LoginBody = {
  body: { email: string; password: string };
  set: any;
  jwt: any;
  setCookie: any;
};

const login = async ({ body, set, jwt, setCookie }: LoginBody) => {
  const { email, password } = body;
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

  // TODO add image upload and processing e.g. ...
  // const emailHash = md5hash(email);
  // const profileImage = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

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
