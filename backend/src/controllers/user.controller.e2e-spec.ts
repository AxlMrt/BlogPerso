import { describe, it, expect } from 'vitest';
import prisma from '../../prisma/lib/prisma';
import supertest from 'supertest';
import app from '..';

const baseURL = '/api/v1';

describe('GET /users', () => {
  it('return empty array', async () => {
    const response = await supertest(app).get(`${baseURL}/users`);

    expect(response.body).toEqual([]);
  });

  
});

describe('POST /users', () => {
  it('should return created user with token', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!.Gh',
    };

    expect(await prisma.user.count()).toEqual(0);
    const response = await supertest(app).post(`${baseURL}/users`).send(body);

    const createdUser = response.body.others;
    const createdToken = response.body.tokenData;

    expect(await prisma.user.count()).toEqual(1);
    expect(response.status).toEqual(201);
    expect(createdUser).toBeDefined();
    expect(createdToken).toBeDefined();
    expect(createdUser.password).toBeUndefined();
  });

  it('should return 409 error', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'azerty',
    };

    await supertest(app).post(`${baseURL}/users`).send(body);

    const response = await supertest(app).post(`${baseURL}/users`).send(body);
    expect(response.status).toBe(409);
  });

  it('should return invalid password', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'azerty',
    };

    const response = await supertest(app).post(`${baseURL}/users`).send(body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid password.');
  });

  it('should return invalid email', async () => {
    const body = {
      email: 'nouvel_utilisateur',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!.Gh',
    };

    const response = await supertest(app).post(`${baseURL}/users`).send(body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email.');
  });
});
