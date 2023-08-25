import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { execSync } from 'child_process';
import { beforeEach, afterEach } from 'vitest';
import * as dotenv from 'dotenv';
dotenv.config();

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('please provide a database url');
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schema);
  return url.toString();
};

const schemaId = `test-${randomUUID()}`;

const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;

export const prisma = new PrismaClient({
  datasources: { db: { url } },
});

beforeEach(() => {
  execSync('npx prisma migrate deploy');
});

afterEach(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
