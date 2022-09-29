export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/test/shared/prisma/singleton.ts'],
};
