import * as dotenv from "dotenv";
dotenv.config();

let jwtSecret: string = process.env.JWT_SECRET as string;
let jwtRefresh: string = process.env.JWT_REFRESH as string;

const secrets = {
  jwtSecret,
  jwtRefresh,
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  web: JSON.parse(process.env.WEBSITE_ACCESS as string)
}

export default secrets;