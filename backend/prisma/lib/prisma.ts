import { PrismaClient } from '@prisma/client';
import secrets from '../../src/config/secrets';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (secrets.nodeEnv === 'production') prisma = new PrismaClient();
else {
  if (!global.prisma) global.prisma = new PrismaClient();

  prisma = global.prisma;
}

export default prisma;
