import { faker } from '@faker-js/faker';
import UserService from '../../../app/service/user';
import AuthHelper from '../../../app/helper/auth';
import { MockContext, createMockContext } from '../../shared/prisma/context';
import { ApplicationError } from '../../../app/helper/error';
import { generateMockUser, generateMockUserLogin } from '../../shared/user';

describe('Test User Service', () => {
  let ctx: MockContext;

  beforeEach(() => {
    ctx = createMockContext();
  });

  describe('Test login', () => {
    it('Should validate user and return generated token', async () => {
      const mockUser = generateMockUser();
      const mockLogin = generateMockUserLogin();
      const mockToken = faker.datatype.hexadecimal({ length: 36 });

      ctx.prisma.user.findFirst.mockResolvedValue(mockUser);

      jest.spyOn(AuthHelper, 'generateToken').mockReturnValue(mockToken);

      const response = await UserService.login(mockLogin, ctx);
      expect(response).toEqual({ token: mockToken });
    });

    it('Should throw forbidden error when credentials are wrong', async () => {
      const mockLogin = generateMockUserLogin();
      const mockToken = faker.datatype.hexadecimal({ length: 36 });

      ctx.prisma.user.findFirst.mockResolvedValue(null);

      jest.spyOn(AuthHelper, 'generateToken').mockReturnValue(mockToken);

      try {
        const response = await UserService.login(mockLogin, ctx);
        expect(response).toBeUndefined();
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
    });
  });
});
