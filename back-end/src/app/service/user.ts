import { encryptPassword, generateToken } from '../helper/auth';
import ERRORS from '../helper/error';
import IContext from '../interface/IContext';

interface ILogin {
  username: string,
  password: string,
}

const login = async (payload: ILogin, ctx: IContext) => {
  const encryptedPassword = encryptPassword(payload.password);

  const response = await ctx.prisma.user.findFirst(
    { where: { ...payload, password: encryptedPassword } },
  );

  if (!response) {
    throw ERRORS.USER.INVALID_CREDENTIALS;
  }

  const token = generateToken(payload);

  return { token };
};

export default {
  login,
};
