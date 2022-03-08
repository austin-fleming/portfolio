const testingOverride = {
  files: ["**/*.spec.ts", "**/*.test.ts"],
  plugins: ["jest"],
  env: {
    "jest/globals": true,
  },
  extends: ["plugin:jest/recommended", "plugin:jest/style"],
  rules: {
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/prefer-number-properties': 'off'
  }
};

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "no-secrets", "sonarjs", "unicorn", "no-unsanitized", "security"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:no-unsanitized/DOM",
    "plugin:unicorn/all",
    "plugin:security/recommended"
  ],
  rules: {
    "no-secrets/no-secrets": "error",
    "unicorn/prefer-module": "off",
  },
  overrides: [testingOverride],
};
