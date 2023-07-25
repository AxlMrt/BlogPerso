import { RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma/lib/prisma";
import createToken from "../utils/tokens";
import createCookie from "../utils/cookies";


const login: RequestHandler<{ email: string, password: string }> = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUniqueOrThrow(email);
    
    const isPasswordMatching = bcrypt.compareSync(password, user.password);
    if (isPasswordMatching) {
      const tokenData = createToken(user);
      res.setHeader('Set-Cookie', [createCookie(tokenData)]);
      res.json(user);
    }
  } catch (error) {
    res.status(401).json({
      message: "Wrong credentials",
    })
  }
}

const _ = {
  login,
}

export default _;