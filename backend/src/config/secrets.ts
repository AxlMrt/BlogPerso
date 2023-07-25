import * as dotenv from "dotenv";
dotenv.config();

let jwtSecret: string = process.env.JWT_SECRET as string;

const secrets = {
  jwtSecret,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
}

export default secrets;