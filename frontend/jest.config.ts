import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: '.',
  verbose: true,
  clearMocks: true,
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '\\.(js|jsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['src/vite-env.d.ts', 'src/setupTests.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['<rootDir>/specs/**/*.spec.{ts,tsx}'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
export default config;
