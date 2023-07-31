export const environment = {
  production: true,
  token_auth_config: {
    apiBase: 'http://127.0.0.1:3000',
    registerAccountCallback: 'http://127.0.0.1:4200/auth/login',
    resetPasswordCallback: 'http://localhost:4200/auth/reset',
  },
  local_base_url: 'http://localhost:4200',
  defaultLang: 'en',
  unameMinLen: 5,
  unameMaxLen: 10,
  passwdMinLen: 6,
  passwdMaxLen: 16,
  titleMaxLen: 30,
  contentMaxLen: 3000,
  memoryMax: 512,
  timeMax: 10000,
  vproblemsSources: ['Atcoder', 'Codeforces', 'UVA', 'POJ'],
};
