/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import tokensFn from '@/utils/tokens';
import createCookie from '@/utils/cookies';
import secrets from '@/config/secrets';
import { IDataStoredInToken, IUser } from '@/config/types';

const refreshedToken = (req: Request, res: Response) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token: string = authorization.split(' ')[1];

    jwt.verify(token, secrets.jwtRefresh, async (err: VerifyErrors | null, user) => {
      if (err) return res.sendStatus(401);

      const { _id } = user as IDataStoredInToken;

      const isUser: IUser | null | undefined = await prisma?.user.findUnique({
        where: { id: _id },
      });

      if (isUser) {
        delete (user as JwtPayload).iat;
        delete (user as JwtPayload).exp;

        const tokenData = tokensFn.createToken(isUser);
        const refreshTokenData = tokensFn.createRefreshToken(isUser);

        res.cookie('token', [createCookie(tokenData)]);
        res.cookie('refresh', [createCookie(refreshTokenData)]);

        const { password, role, createdAt, updatedAt, ...others } = isUser;
        res.json({ others, tokenData, refreshTokenData });
      } else {
        res.sendStatus(404);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

const _ = {
  refreshedToken,
};

export default _;
