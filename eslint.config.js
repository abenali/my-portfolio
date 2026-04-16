module.exports = [
    {
        files: ['js/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                CSS: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'error'
        }
    }
];
