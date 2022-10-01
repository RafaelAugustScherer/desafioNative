import Joi from 'joi';

const filter = Joi.object({
  city: Joi.string(),
}).strict();

const readById = Joi.object({
  id: Joi.number(),
});

const update = Joi.object({
  first_name: Joi.string().max(50),
  last_name: Joi.string().max(50),
  email: Joi.string().email().max(100),
  gender: Joi.string().max(20),
  company: Joi.string().max(50),
  city: Joi.string().max(50),
  title: Joi.string().max(50),
}).strict();

export default {
  filter,
  readById,
  update,
};
