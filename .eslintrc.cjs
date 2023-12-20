module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb-base',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    indent: ['error', 2], // 들여쓰기 2칸만 허용
    'no-var': 'error', // // var 키워드 사용 금지
    'require-await': 'error', // async 함수 내부에 await 키워드가 없으면 오류 발생
    eqeqeq: 'warn', // ==, != 대신에 ===, !== 사용
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
};
