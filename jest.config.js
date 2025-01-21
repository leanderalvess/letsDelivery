module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1",
    },
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.d.ts",
    ],
};
