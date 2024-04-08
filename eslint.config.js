import playwright from 'eslint-plugin-playwright'

export default [
    playwright.configs['flat/recommended'],
    {
        rules: {
            // Customize Playwright rules
            // ...
        },
    },
]