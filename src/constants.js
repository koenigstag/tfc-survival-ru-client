const {
  env: { NODE_ENV },
} = process;

const mode = NODE_ENV || 'development';

const constants = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  ADMIN_TOKEN: 'ADMIN_TOKEN',
  SERVER_DOMAIN:
    mode === 'development' ? 'localhost:5001' : 'tfc-survival.ru',
  MAP_URL: 'http://tfc-survival.ru:8154/',
  SERVER_PING_URL: 'https://eu.mc-api.net/v3/server/ping/tfc-survival.ru',
};

export default constants;
