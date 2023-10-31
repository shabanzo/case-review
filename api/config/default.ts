const {
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  REDIS_HOST,
  REDIS_PORT,
  API_PORT,
  CLIENT_ORIGIN,
} = process.env;

export default {
  port: API_PORT,
  dbUri: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  redisUrl: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  origin: CLIENT_ORIGIN,
  accessTokenExpiresIn: 15,
  accessTokenPrivateKey: ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: ACCESS_TOKEN_PUBLIC_KEY,
};
