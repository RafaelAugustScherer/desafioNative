import Joi from 'joi';

const filter = Joi.object({
  city: Joi.string(),
}).strict();

const readById = Joi.object({
  id: Joi.number(),
});

const update = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string(),
  company: Joi.string(),
  city: Joi.string(),
  title: Joi.string(),
}).strict();

export default {
  filter,
  readById,
  update,
};
