import { ObjectSchema } from 'joi';
import { faker } from '@faker-js/faker';
import CustomerSchema from '../../app/schema/customer';
import ERRORS from '../../app/helper/error';

const generateJoiError = (
  object?: object,
  schemaToParse?: ObjectSchema,
) => {
  if (object && schemaToParse) {
    const { error } = schemaToParse.validate(object);
    return error;
  }

  const invalidFilter = { invalid: faker.datatype.string(5) };

  const { error } = CustomerSchema.filter.validate(invalidFilter);
  return error;
};

const generateApplicationError = () => ERRORS.CUSTOMER.NOT_FOUND;

export {
  generateJoiError,
  generateApplicationError,
};
