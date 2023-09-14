// function to check if an email has a valifd format, and if it does, it returns true, otherwise it returns false.

import { prisma } from '../lib/prisma';

export const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const doesUserExist = async (
  key: 'email' | 'userName',
  value: string
) => {
  const whereCondition: any = {};
  whereCondition[key] = value;

  return await prisma.user.findUnique({
    where: whereCondition,
  });
};
