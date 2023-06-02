module.exports = {
  testEnvironment: "node",
  bail: true,
  verbose: true,
  setupFilesAfterEnv: ["jest-extended"],
  testPathIgnorePatterns: [`/node_modules/`],
  testMatch: ["<rootDir>/test/**/*.spec.ts"],
  preset: `ts-jest`,
};
