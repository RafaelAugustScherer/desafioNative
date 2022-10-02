import Joi from 'joi';

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).strict();

export default {
  login,
};
