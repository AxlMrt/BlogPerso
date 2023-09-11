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

  it('should not create with unauthorized arguments', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/notes`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Updated note',
        note: 'This is the updated body',
        arg: 'new argument',
        userMail: user.body.others.email,
      });

    expect(response.status).toEqual(400);
  });
});

describe('PUT /notes/:id', async () => {
  const user = await supertest(app).post(`${baseURL}/users`).send({
    email: 'test.update@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'A7erT!Gh',
  });

  const userId = user.body.others.id;
  const note = await supertest(app)
    .post(`${baseURL}/notes`)
    .set('Authorization', `Bearer ${user.body.tokenData.token}`)
    .send({
      title: 'test',
      note: 'body of the note',
      userMail: user.body.others.email,
    });

  it('should update the note', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/notes/${note.body.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Updated note',
        note: 'This is the updated body',
        userId,
      });

    expect(response.status).toEqual(200);
  });

  it('should not accept invalid fields', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/notes/${note.body.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Updated note',
        note: 'This is the updated body',
        arg: 'new argument',
        userId,
      });

    expect(response.status).toEqual(400);
  });

  it('should update with one argument', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/notes/${note.body.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Updated note',
        userId,
      });

    expect(response.status).toEqual(200);
  });

  it('should update with one argument', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/notes/${note.body.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        note: 'This is the updated note',
        userId,
      });

    expect(response.status).toEqual(200);
  });
});

describe('DELETE /notes/:id', async () => {
  const superUser = await prisma.user.create({
    data: {
      email: 'superUserDel@del.com',
      firstName: 'super',
      lastName: 'user',
      password: 'p@$$WorD123',
      role: 'ADMIN',
    },
  });

  const user = await supertest(app).post(`${baseURL}/users`).send({
    email: 'test@test.fr',
    firstName: 'test',
    lastName: 'test',
    password: 'p@$$W0rd123',
  });

  const note1 = await supertest(app)
    .post(`${baseURL}/notes`)
    .set('Authorization', `Bearer ${user.body.tokenData.token}`)
    .send({ title: 'Note 1', userMail: user.body.others.email });
  const note2 = await supertest(app)
    .post(`${baseURL}/notes`)
    .set('Authorization', `Bearer ${user.body.tokenData.token}`)
    .send({ title: 'Note 2', userMail: user.body.others.email });

  it('should delete note', async () => {
    const response = await supertest(app)
      .delete(`${baseURL}/notes/${note1.body.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({ userId: user.body.others.id });

    expect(response.status).toEqual(204);
  });

  it('should  delete note with admin id', async () => {
    const response = await supertest(app)
      .delete(`${baseURL}/notes/${note2.body.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({ userId: superUser.id });

    expect(response.status).toEqual(204);
  });

  it("should return 404 if not doesn't exist", async () => {
    const response = await supertest(app)
      .delete(`${baseURL}/notes/${note2.body.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({ userId: superUser.id });

    expect(response.status).toEqual(404);
  });
});
