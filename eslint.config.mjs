import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ['next'],
        rules: {
            'react/no-unescaped-entities': 'off',
            '@next/next/no-page-custom-font': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/interface-name-prefix': 0,
            '@typescript-eslint/explicit-member-accessibility': 0,
            '@typescript-eslint/camelcase': 0,
            '@typescript-eslint/no-explicit-any': 'off',
            'react/no-unescaped-entities': 'off',
            '@next/next/no-page-custom-font': 'off',
        },
        ignores: ['src/generated/**'],
    }),
];

export default eslintConfig;
