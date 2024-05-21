import playwright from 'eslint-plugin-playwright'

export default [{
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
},
{
    files: ['tests/**'],
    rules: {
        "playwright/no-skipped-test": [
            "error",
            {
                "allowConditional": true
            }
        ]
    }
},
]