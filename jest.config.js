module.exports = {
  'testEnvironment': 'jsdom',
  'roots': [
    '<rootDir>/packages'
  ],
  'testMatch': [
    '**/?(*.)+(test).+(ts|tsx|js)'
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  'moduleNameMapper': {
    '@lexi-kit/(.+)$': '<rootDir>/packages/react/$1/src'
  },
  'watchPlugins': [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  'setupFilesAfterEnv': [
    '<rootDir>/scripts/setup-tests.ts',
    'jest-axe/extend-expect'
  ]
};
