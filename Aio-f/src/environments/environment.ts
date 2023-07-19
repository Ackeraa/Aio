export const environment = {
	production: true,
	token_auth_config: {
		apiBase: 'http://127.0.0.1:3000',
		registerAccountCallback: 'http://127.0.0.1/login',
	},
  defaultLang: 'en',
  unameMinLen: 5,
  unameMaxLen: 10,
  passwdMinLen: 6,
  passwdMaxLen: 16,
};
