import Joi from 'joi';

const filter = Joi.object({
  city: Joi.string(),
}).strict();

export default {
  filter,
};
