let secret:string = process.env.JWT_SECRET as string;

const secrets = {
  jwtSecret: secret,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
}

export default secrets;