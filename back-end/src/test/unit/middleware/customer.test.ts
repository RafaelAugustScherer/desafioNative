import { getMockReq, getMockRes } from '@jest-mock/express';
import { faker } from '@faker-js/faker';
import { ValidationError } from 'joi';
import CustomerMiddleware from '../../../app/middleware/customer';
import { generateMockCustomer } from '../../shared/customer';

describe('Test Customer Middleware', () => {
  const req = getMockReq();
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  describe('Test validateFilter', () => {
    it('Should correctly validate city filter', async () => {
      const mockCity = faker.address.cityName();
      req.query = { city: mockCity };

      await CustomerMiddleware.validateFilter(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('Should not validate other fields', async () => {
      const mockedCustomer = generateMockCustomer({ withId: true });
      const fieldsToTest = Object.keys(mockedCustomer).filter((i) => i !== 'city');

      const testPromises = fieldsToTest.map(async (field) => {
        req.query = { [field]: faker.datatype.string(5) };

        try {
          await CustomerMiddleware.validateFilter(req, res, next);
        } catch (e) {
          expect(e).toBeInstanceOf(ValidationError);
        }
        expect(next).not.toHaveBeenCalled();
      });

      await Promise.all(testPromises);
    });
  });

  describe('Test validateReadById', () => {
    it('Should correctly validate valid id', async () => {
      const mockId = faker.random.numeric();
      req.params = { id: mockId };

      await CustomerMiddleware.validateReadById(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('Should throw an error when id is a string', async () => {
      const mockId = faker.random.word();
      req.params = { id: mockId };

      try {
        await CustomerMiddleware.validateReadById(req, res, next);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
      }
      expect(next).not.toHaveBeenCalled();
    });
  });
});
