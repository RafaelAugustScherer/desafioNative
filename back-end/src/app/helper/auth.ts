import md5 from 'md5';
import JWT from 'jsonwebtoken';

const encryptPassword = (password: string) => md5(password);

const generateToken = (payload: object) => {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw new Error('Please define JWT_SECRET Environment variable');
  }

  return JWT.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export default {
  encryptPassword,
  generateToken,
};
