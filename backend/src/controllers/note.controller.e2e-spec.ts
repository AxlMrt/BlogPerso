import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '..';
import prisma from '@/prisma/lib/prisma';

const baseURL = '/api/v1';

describe('GET /notes', async () => {
  const superUser = await prisma.user.create({
    data: {
      email: 'super-user@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!Gh',
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!Gh',
    },
  });

  it('should get all users', async () => {
    const response = await supertest(app).get(`${baseURL}/notes`).send(superUser!);
    expect(response.status).toEqual(200);
  });

  it('should return 403', async () => {
    const response = await supertest(app).get(`${baseURL}/notes`).send(user);
    expect(response.status).toEqual(403);
  });
});

describe('GET /notes/:id', () => {});
describe('POST /notes', () => {});
describe('PUT /notes/:id', () => {});
describe('DELETE /notes/:id', () => {});
