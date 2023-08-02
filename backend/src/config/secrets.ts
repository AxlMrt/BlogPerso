import * as dotenv from "dotenv";
dotenv.config();

let jwtSecret: string = process.env.JWT_SECRET as string;
let dev_access: string = process.env.DEV_ACCESS as string;
let website_access: string = process.env.WEBSITE_ACCESS as string;

const secrets = {
  jwtSecret,
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  dev: dev_access,
  web: website_access
}

export default secrets;