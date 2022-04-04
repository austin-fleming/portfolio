module.exports = {
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  moduleNameMapper: {
    '$lib/(.*)': '<rootDir>/src/lib/$1'
  },
  roots: [
    '<rootDir>'
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    '^.+\\.js$': 'babel-jest',
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": true
      }
    ],
    "^.+\\.ts$": "ts-jest"
  }
}