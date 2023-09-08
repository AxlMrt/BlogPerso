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

describe('GET /notes/:id', async () => {
  const superUser = await prisma.user.findUnique({
    where: {
      email: 'super-user@gmail.com',
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      email: 'user@gmail.com',
    },
  });

  const data = {
    title: 'Test titre',
    note: 'random text to test if it can receive a note',
    userId: user!.id,
  };
  const note = await prisma.note.create({
    data,
  });

  it('should render note details', async () => {
    const response = await supertest(app).get(`${baseURL}/notes/${note.id}`).send(superUser!);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id');

    expect(response.body).toHaveProperty('title');
    expect(response.body.title).toBe(data.title);

    expect(response.body).toHaveProperty('note');
    expect(response.body.note).toBe(data.note);

    expect(response.body).toHaveProperty('createdAt');
  });

  it('should render 403', async () => {
    const response = await supertest(app).get(`${baseURL}/notes/${note.id}`).send(user!);

    expect(response.status).toEqual(403);
  });

  it('should render 404', async () => {
    const fake_id = 'fake_id';

    const response = await supertest(app).get(`${baseURL}/notes/${fake_id}`).send(superUser!);

    expect(response.status).toEqual(404);
  });
});

describe('POST /notes', async () => {
  const superUser = await prisma.user.findUnique({
    where: {
      email: 'super-user@gmail.com',
    },
  });

  const user = await supertest(app).post(`${baseURL}/users`).send({
    email: 'john2.doe@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'A7erT!Gh',
  });

  it('should create a new note', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/notes`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'test',
        note: "That's a note test",
        userMail: user.body.others.email,
      });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('note');
    expect(response.body).toHaveProperty('createdAt');
  });

  it('should not create with missing required data', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/notes`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        note: "That's a note test",
        userMail: user.body.others.email,
      });

    expect(response.status).toEqual(400);
  });

  it('should create new note with missing note data', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/notes`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'test',
        userMail: user.body.others.email,
      });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('title');
    expect(response.body.note).toBeFalsy();
  });

  it('should not create with wrong userMail', async () => {
    const invalid_email = 'invalid_email';

    const response = await supertest(app)
      .post(`${baseURL}/notes`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'test',
        userMail: invalid_email,
      });

    expect(response.status).toEqual(400);
  });

  it('should not create with inexistant user', async () => {
    const inexistant_user = 'inexistant_user@gmail.com';
    const response = await supertest(app)
      .post(`${baseURL}/notes`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'test',
        userMail: inexistant_user,
      });

    expect(response.status).toEqual(400);
  });
});
describe('PUT /notes/:id', () => {});
describe('DELETE /notes/:id', () => {});
