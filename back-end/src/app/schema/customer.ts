import Joi from 'joi';

const filter = Joi.object({
  city: Joi.string(),
}).strict();

const readById = Joi.object({
  id: Joi.number(),
});

export default {
  filter,
  readById,
};
