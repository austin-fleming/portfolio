const testingOverride = {
  env: {
    "jest/globals": true,
  },
  extends: ["plugin:jest/recommended", "plugin:jest/style"],
  files: ["**/*.spec.ts", "**/*.test.ts"],
  plugins: ["jest"],
  rules: {
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-number-properties': 'off'
  }
};

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:typescript-sort-keys/recommended",
    "plugin:sonarjs/recommended",
    "plugin:no-unsanitized/DOM",
    "plugin:unicorn/all",
    "plugin:security/recommended"
  ],
  overrides: [testingOverride],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "sort-keys-fix", "typescript-sort-keys", "no-secrets", "sonarjs", "unicorn", "no-unsanitized", "security"],
  root: true,
  rules: {
    "no-secrets/no-secrets": "error",
    "sort-keys": ["error", "asc", { "caseSensitive": true, "natural": true }],
    "sort-keys-fix/sort-keys-fix": "warn",
    "unicorn/prefer-module": "off"
  },
};
