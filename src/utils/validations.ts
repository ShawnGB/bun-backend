import { prisma } from '../lib/prisma';
import { errorResponse } from './responses';

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const doesUserExist = async (
  key: 'email' | 'userName',
  value: string
) => {
  return prisma.user.findUnique({
    where: { [key]: value } as any,
  });
};

export const checkId = (id: string) => {
  if (!id) return errorResponse('Missing id.');
  if (!UUID_REGEX.test(id)) return errorResponse('Invalid id.');
  return null;
};

export const checkUserBody = async (body: UserUpdateBody | UserCreateBody) => {
  if (body.email) {
    if (!isValidEmail(body.email)) {
      return errorResponse('Invalid email address.');
    }

    if (await doesUserExist('email', body.email)) {
      return errorResponse('Email address already in use.');
    }
  }

  if (body.userName && (await doesUserExist('userName', body.userName))) {
    return errorResponse('User name already in use.');
  }

  return null;
};
