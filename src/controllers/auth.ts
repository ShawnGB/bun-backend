import { prisma } from '~/libs/prisma';
import { errorResponse } from '~/utils/responses';
import { checkUserBody } from '~/utils/validations';

const login = async ({ body, jwt, setCookie }: LoginBody) => {
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true },
  });

  if (!user) return { success: false, message: 'Invalid email or password.' };

  const validate = await Bun.password.verify(password, user.password);

  if (!validate)
    return { success: false, message: 'Invalid email or password.' };

  const payload = {
    id: user.id,
    email: user.email,
    expiresIn: '1h',
  };

  const token = await jwt.sign(payload);

  setCookie('auth_token', token, {
    httpOnly: true,
    secure: Bun.env.NODE_ENV === 'production', // Assuming Bun.env.NODE_ENV returns either 'development' or 'production'
    maxAge: 3600,
  });

  return {
    success: true,
    data: { token },
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
