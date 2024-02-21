/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:playwright/all", "prettier"],
  parserOptions: {
    ecmaVersion: 2023,
  },
  plugins: ["playwright"],
  root: true,
};
