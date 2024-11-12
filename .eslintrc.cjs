module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    quotes: ['warn', 'single'],
    semi: ['warn', 'never'],
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-mutating-props': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/valid-define-emits': 'off'
  }
}
