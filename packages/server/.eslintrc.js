module.exports = {
    extends: ['../../.eslintrc.js'],
    env: {
        node: true,
        browser: false
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
    }
};
