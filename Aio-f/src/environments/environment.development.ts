export const environment = {
  production: false,
  token_auth_config: {
    apiBase: 'http://127.0.0.1:3000',
    registerAccountCallback: 'http://localhost:4200/auth/login',
    resetPasswordCallback: 'http://localhost:4200/auth/reset',
  },
  defaultLang: 'zh-CN',
  languages: ['zh-CN', 'en'],
  unameMinLen: 5,
  unameMaxLen: 10,
  passwdMinLen: 6,
  passwdMaxLen: 16,
  titleMaxLen: 30,
  contentMaxLen: 3000,
  memoryMax: 512,
  timeMax: 10000,
  problemsSources: ['Aio', 'Private', 'Atcoder', 'Codeforces', 'UVA', 'POJ'],
  problemLanguages: ['C', 'Cpp', 'Java', 'Python'],
  problemTags: ['DP', 'Greedy', 'DFS', 'BFS', 'Geometry', 'Brute Force'],
  ruleTypes: ['ACM', 'OI'],
};
