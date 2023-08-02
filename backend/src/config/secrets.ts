import * as dotenv from "dotenv";
dotenv.config();

let jwtSecret: string = process.env.JWT_SECRET as string;

const secrets = {
  jwtSecret,
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  dev: process.env.DEV_ACCESS,
  web: process.env.WEBSITE_ACCESS
}

export default secrets;