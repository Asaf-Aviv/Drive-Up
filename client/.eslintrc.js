module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
  },
  'overrides': [
    {
      'files': ['**/*.tsx'],
      'rules': {
        'react/prop-types': 'off'
      }
    }
  ],
  rules: {
    'indent': 'off',
    '@typescript-eslint/indent': [
      'error', 
      2,
    ],
    'no-console': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off',
    'comma-dangle': [
      'error', 
      'always-multiline',
    ],
    'lines-between-class-members': 'off',
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', 100],
    'semi': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'import/order': 'error',
    'react/button-has-type': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'function-paren-newline': [
      'error',
      'consistent'
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'key-spacing': ['error', {
      beforeColon: false
    }],
    'react/jsx-tag-spacing': 'error',
    'no-multi-spaces': 'error',
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child'}],
    'react/jsx-max-props-per-line': ['error', {maximum: 1, when: 'multiline'}],
    'arrow-spacing': 'error',
    'comma-spacing': 'error',
    'keyword-spacing': 'error',
    'space-in-parens': 'error',
    'arrow-body-style': 'error',
    'space-infix-ops': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line'
      }
    ],
    'semi-style': 'error',
    'quotes': ['error', 'single'],
    'import/no-useless-path-segments': 'error',
    'arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': true }],
    'import/newline-after-import': 'error',
    '@typescript-eslint/type-annotation-spacing': ['error', {
      before: false,
      after: true,
      overrides: {
        colon: {
          before: false,
          after: true
        },
        arrow: {
          before: true,
          after: true,
        }
      }
    }]
  },
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
