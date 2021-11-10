import * as dotenv from 'dotenv';
dotenv.config();

// application
const END_POINT: string = process.env.END_POINT || 'graphql';
const PORT: number = +process.env.PORT || 5001;
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000;

// bcrypt
const BCRYPT_SALT: number = +process.env.BCRYPT_SALT || 10;

// jsonwebtoken
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'access-token';
const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || 'access-token-key';
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN || 'refresh-token';
const REFRESH_TOKEN_SECRET: string =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-token-key';

export {
  END_POINT,
  PORT,
  RATE_LIMIT_MAX,
  BCRYPT_SALT,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SECRET,
};
