module.exports = {
  plugins: [
    'simple-import-sort',
    'unused-imports',
    '@stylistic',
  ],
  extends: [
    'next/core-web-vitals',
    'next/typescript',
  ],
  ignorePatterns: [
    '!.eslintrc.js',
    '!.stylelintrc.js',
    '!.lintstagedrc.js',
  ],
  rules: {
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Style imports
          ['^.+\\.css$'],
          // react related packages, other packages
          ['^react', '(\\w-/)*'],
          // Side effect imports, Alias, Relative
          ['^@pages'],
          ['^@components'],
          [
            '^\\u0000',
            '^@assets',
            '^@store',
            '^@router',
            '^@',
            '^\\.',
          ],
        ],
      },
    ],
    // section of https://www.npmjs.com/package/eslint-plugin-unused-imports
    'unused-imports/no-unused-imports': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // section of https://www.npmjs.com/package/eslint-plugin-unused-imports
    'no-plusplus': [
      'warn',
      { allowForLoopAfterthoughts: true },
    ],
    '@stylistic/quotes': ['warn', 'single'],
    '@stylistic/quote-props': ['warn', 'as-needed'],
    '@stylistic/jsx-quotes': ['warn', 'prefer-double'],
    '@stylistic/indent-binary-ops': ['warn', 2],
    '@stylistic/indent': ['warn', 2, {
      SwitchCase: 1,
      MemberExpression: 1,
    }],
    '@stylistic/max-len': ['warn', {
      code: 120,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    '@stylistic/comma-dangle': ['warn', 'always-multiline'],
    '@stylistic/no-multi-spaces': 'warn',
    '@stylistic/key-spacing': ['warn', {
      beforeColon: false,
      afterColon: true,
    }],
    '@stylistic/comma-spacing': 'warn',
    '@stylistic/array-bracket-spacing': 'warn',
    '@stylistic/object-curly-spacing': ['warn', 'always'],
    '@stylistic/space-before-blocks': 'warn',
    '@stylistic/padded-blocks': ['warn', 'never'],
    '@stylistic/object-curly-newline': ['warn', {
      multiline: true,
      consistent: true,
    }],
    '@stylistic/semi': [
      'warn',
      'never',
    ],
    '@stylistic/arrow-parens': [
      'warn',
      'as-needed',
    ],
    '@stylistic/no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
        maxBOF: 0,
      },
    ],
    '@stylistic/no-trailing-spaces': 'warn',
    '@stylistic/padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'any', prev: '*', next: ['if', 'for', 'return'] },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'throw',
          'try',
          'while',
          'do',
          'switch',
          'function',
          'multiline-const',
        ],
      },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
    ],
    '@stylistic/function-call-argument-newline': ['warn', 'consistent'],
    '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
    '@stylistic/lines-between-class-members': [
      'warn',
      {
        enforce: [
          { blankLine: 'always', prev: 'method', next: 'field' },
          { blankLine: 'always', prev: 'field', next: 'method' },
          { blankLine: 'always', prev: 'method', next: 'method' },
          { blankLine: 'never', prev: 'field', next: 'field' },
        ],
      },
    ],
  },
}
