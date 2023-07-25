import { RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma/lib/prisma";
import createToken from "../utils/tokens";
import createCookie from "../utils/cookies";

const login: RequestHandler<{ email: string, password: string }> = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email
      },
    });
    
    if (!user)
      return res.status(401).json("Wrong credentials");
    
    const isPasswordMatching = bcrypt.compareSync(password, user.password);
    if (isPasswordMatching) {
      const tokenData = createToken(user);
      res.setHeader('Set-Cookie', [createCookie(tokenData)]);
      res.json(user);
    } else {
      return res.status(401).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const _ = {
  login,
}

export default _;