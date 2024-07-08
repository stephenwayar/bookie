/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(mjs|esm|es6)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(\\@iconify/react)/)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      // other ts-jest options
      diagnostics: {
        ignoreCodes: ['TestingLibraryElementError'],
      },
    },
  },
};

module.exports = createJestConfig(config);