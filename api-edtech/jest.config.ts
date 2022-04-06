const defaultConfig = {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  clearMocks: true,
  preset: "ts-jest",
  coverageThreshold: {
    global: {
      branch: 100,
      function: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxWorkers: "50%",
  watchPathIgnorePatterns: ["node_modules"],
  transformIgnorePatterns: ["node_modules"],
  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
  },
};

export default {
  projects: [
    {
      ...defaultConfig,
      displayName: "Tests Unitary",
      testMatch: ["**/modules/*/tests/*.test.ts"],
      
    },
    {
      ...defaultConfig,
      displayName: "Tests Integration",
      testMatch: ["**/__tests__/*.test.ts"],
      
    }
  ],
};
