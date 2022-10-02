import { User } from '@prisma/client';
import AuthHelper from '../helper/auth';
import ERRORS from '../helper/error';
import IContext from '../interface/IContext';

type UserLogin = Pick<User, 'username' | 'password'>;

const login = async (payload: UserLogin, ctx: IContext) => {
  const encryptedPassword = AuthHelper.encryptPassword(payload.password);

  const response = await ctx.prisma.user.findFirst(
    { where: { ...payload, password: encryptedPassword } },
  );

  if (!response) {
    throw ERRORS.USER.INVALID_CREDENTIALS;
  }

  const token = AuthHelper.generateToken(payload);

  return { token };
};

export default {
  login,
};
