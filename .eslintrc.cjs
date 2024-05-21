/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:playwright/recommend"],
  parserOptions: {
    ecmaVersion: 2023,
  },
  plugins: ["playwright"],
  root: true,
};