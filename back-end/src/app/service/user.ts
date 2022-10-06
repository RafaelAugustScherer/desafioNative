import { User } from '@prisma/client';
import AuthHelper from '../helper/auth';
import ERRORS from '../helper/error';
import IContext from '../interface/IContext';

export type UserLogin = Pick<User, 'username' | 'password'>;

const login = async (payload: UserLogin, ctx: IContext) => {
  const encryptedPassword = AuthHelper.encryptPassword(payload.password);
  const dbUser = { ...payload, password: encryptedPassword };

  const response = await ctx.prisma.user.findFirst(
    { where: dbUser },
  );

  if (!response) {
    throw ERRORS.USER.INVALID_CREDENTIALS;
  }

  const token = AuthHelper.generateToken(dbUser);

  return { token };
};

export default {
  login,
};
