import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },

    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,

    {
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['eslint.config.js'],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // `_args` marks a parameter that a command doesn't need.
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            // Allows short callbacks like `(count) => statusBar.setCommandCount(count)`.
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            // Numbers in template strings are fine (e.g. `cmds ${count}`).
            '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
        },
    },

    {
        files: ['**/*.js'],
        extends: [tseslint.configs.disableTypeChecked],
    },

    // Formatting is Prettier's job — turn off conflicting rules.
    prettier,
);
