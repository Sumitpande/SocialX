const { error } = require("console");

module.exports = {
    parser: "@typescript-eslint/parser",

    extends: ["plugin:prettier/recommended", "eslint:recommended", "prettier"],
    plugins: ["@typescript-eslint", "prettier"],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        // project: 'tsconfig.json',
    },
    env: {
        es6: true,
        node: true,
    },
    rules: {
        "no-var": "error",
        "no-unused-vars": "off",
        semi: "error",
        indent: ["error", 4, { SwitchCase: 1 }],
        "no-multi-spaces": "error",
        "space-in-parens": "error",
        "no-multiple-empty-lines": "error",
        "prefer-const": "error",
        "prettier/prettier": "error",
    },
};
