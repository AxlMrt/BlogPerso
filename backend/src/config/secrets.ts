import * as dotenv from 'dotenv';
dotenv.config();

const jwtSecret: string = process.env.JWT_SECRET as string;
const jwtRefresh: string = process.env.JWT_REFRESH as string;
const authSecret: string = process.env.AUTH_EMAIL as string;
const passSecret: string = process.env.AUTH_PASSWORD as string;
const clientId: string = process.env.OAUTH_CLIENTID as string;
const clientSecret: string = process.env.OAUTH_CLIENT_SECRET as string;
const refreshToken: string = process.env.OAUTH_REFRESH_TOKEN as string;
const accessToken: string = process.env.OAUTH_ACCESS_TOKEN as string;

const secrets = {
  jwtSecret,
  jwtRefresh,
  authSecret,
  passSecret,
  clientId,
  clientSecret,
  accessToken,
  refreshToken,
  port: Number(process.env.PORT),
  web: JSON.parse(process.env.WEBSITE_ACCESS as string),
};

export default secrets;
