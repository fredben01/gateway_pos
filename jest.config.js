module.exports = {
  testEnvironment: "node",
  bail: true,
  verbose: true,
  setupFilesAfterEnv: ["jest-extended"],
  reporters: [],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!**/node_modules/**",
    "!src/**/*.entity.ts",
  ],
  coverageReporters: [`json`, `text`, `html`, "lcov"],
  coverageDirectory: `reports/coverage`,
  testPathIgnorePatterns: [`/node_modules/`],
  testMatch: ["<rootDir>/test/**/*.spec.ts"],
  preset: `ts-jest`,
};
