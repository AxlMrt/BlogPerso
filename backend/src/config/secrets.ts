import * as dotenv from "dotenv";
dotenv.config();

let jwtSecret: string = process.env.JWT_SECRET as string;

const secrets = {
  jwtSecret,
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  dev: process.env.DEV_ACCESS as string,
  web: JSON.parse(process.env.WEBSITE_ACCESS as string)
}

export default secrets;