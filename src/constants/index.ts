import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    // database: {
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT, 10),
    //   database: process.env.DB_NAME,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    // },
    postgres_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
  };
});
