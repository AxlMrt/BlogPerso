import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '..';

const baseURL = '/api/v1';

//describe('GET /books/feed', () => {})
//describe('GET /books/:id', () => {});

describe('POST /books/', async () => {
  const user = await supertest(app).post(`${baseURL}/users`).send({
    email: 'john2.doe@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'A7erT!Gh',
  });

  it('should create a new book', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/books`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        type: 'Fiction',
        year: 2023,
        feedBack: 3,
        publisher: 'Sample Publisher',
        userMail: 'john2.doe@gmail.com',
      });

    expect(response.status).toBe(201);
  });

  it('should not create a new book with missing required data', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/books`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        author: 'John Doe',
        type: 'Fiction',
        year: 2023,
        feedBack: 3,
        publisher: 'Sample Publisher',
        userMail: 'john2.doe@gmail.com',
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should not create a new book with missing required data', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/books`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        type: 'Fiction',
        year: 2023,
        feedBack: 3,
        publisher: 'Sample Publisher',
        userMail: 'john2.doe@gmail.com',
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should create a new book with not required missing data', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/books`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book 2',
        author: 'John Doe',
        userMail: 'john2.doe@gmail.com',
      });

    expect(response.status).toBe(201);
    expect(response).toHaveProperty('error');
  });

  it('should not create a new book with invalid user email', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/books`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        type: 'Fiction',
        year: 2023,
        feedBack: 3,
        publisher: 'Sample Publisher',
        userMail: 'invalid_email',
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should not create a new book with invalid feedback', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/books`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        type: 'Fiction',
        year: 2023,
        feedBack: 'invalid_feedback',
        publisher: 'Sample Publisher',
        userMail: 'john2.doe@gmail.com',
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should not create a new book with invalid year', async () => {
    const response = await supertest(app)
      .post(`${baseURL}/books`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        type: 'Fiction',
        year: 'invalid_year',
        feedBack: 4,
        publisher: 'Sample Publisher',
        userMail: 'john2.doe@gmail.com',
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should not create a new book with invalid feedback value', async () => {
    const invalidFeedback = 6;

    const response = await supertest(app)
      .post(`${baseURL}/books`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        type: 'Fiction',
        year: 2023,
        feedBack: invalidFeedback,
        publisher: 'Sample Publisher',
        userMail: 'john2.doe@gmail.com',
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });
});

describe('PUT /books/:id', async () => {
  const user = await supertest(app).post(`${baseURL}/users`).send({
    email: 'jane.doe@gmail.com',
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'A7erT!Gh',
  });
  const userId = user.body.others.id;

  const userAdmin = await prisma?.user.create({
    data: {
      email: 'joe.doe@gmail.com',
      firstName: 'Joe',
      lastName: 'Doe',
      password: 'A7erT!Gh',
      role: 'ADMIN',
    },
  });

  const book = await supertest(app)
    .post(`${baseURL}/books`)
    .set('Authorization', `Bearer ${user.body.tokenData.token}`)
    .send({
      title: 'Sample Book',
      author: 'John Doe',
      type: 'Fiction',
      year: 2023,
      feedBack: 3,
      publisher: 'Sample Publisher',
      userMail: 'jane.doe@gmail.com',
    });

  it('should update a book with valid data', async () => {
    const body = {
      title: 'Updated Book Title',
      author: 'John Doe',
      userId: user.body.others.id,
    };

    const response = await supertest(app)
      .put(`${baseURL}/books/${book!.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send(body);

    expect(response.status).toBe(200);
    expect(response.body.book.title).toEqual(body.title);
  });

  it('should update if user is admin', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/books/${book!.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        publisher: 'Sample Publisher',
        userId: userAdmin?.id,
      });

    expect(response.status).toBe(200);
    expect(response).toHaveProperty('error');
  });

  it('should not update a book with missing required title data', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/books/${book!.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        author: 'John Doe',
        type: 'Fiction',
        year: 2023,
        feedBack: 4,
        publisher: 'Sample Publisher',
        userId,
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should not update a book with missing required author data', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/books/${book!.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Updated Book Title',
        type: 'Fiction',
        year: 2023,
        feedBack: 4,
        publisher: 'Sample Publisher',
        userId,
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should update a book with not required missing data', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/books/${book!.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Updated Book Title',
        author: 'Jane Doe',
        userId,
      });

    expect(response.status).toBe(200);
  });

  it('should not update a book if user ids does not match', async () => {
    const differentUserId = 'different_id';

    const response = await supertest(app)
      .put(`${baseURL}/books/${book!.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Updated Book Title again',
        author: 'Axel Doe',
        type: 'Fiction',
        year: 2023,
        feedBack: 4,
        publisher: 'Sample Publisher',
        userId: differentUserId,
      });

    expect(response.status).toBe(403);
    expect(response).toHaveProperty('error');
  });

  it('should not create a new book with invalid feedback', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/books/${book!.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        type: 'Fiction',
        year: 2023,
        feedBack: 'invalid_feedback',
        publisher: 'Sample Publisher',
        userId,
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should not create a new book with invalid year', async () => {
    const response = await supertest(app)
      .put(`${baseURL}/books/${book!.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        type: 'Fiction',
        year: 'invalid_year',
        feedBack: 4,
        publisher: 'Sample Publisher',
        userId,
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should not update book with invalid feedback value', async () => {
    const invalidFeedback = 6;

    const response = await supertest(app)
      .put(`${baseURL}/books/${book!.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        type: 'Fiction',
        year: 2023,
        feedBack: invalidFeedback,
        publisher: 'Sample Publisher',
        userId,
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });
});

describe('DELETE /books/:id', async () => {
  const user = await supertest(app).post(`${baseURL}/users`).send({
    email: 'jane2.doe@gmail.com',
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'A7erT!Gh',
  });
  const userId = user.body.others.id;
  const userAdmin = await prisma?.user.create({
    data: {
      email: 'joe2.doe@gmail.com',
      firstName: 'Joe',
      lastName: 'Doe',
      password: 'A7erT!Gh',
      role: 'ADMIN',
    },
  });

  const book1 = await supertest(app)
    .post(`${baseURL}/books`)
    .set('Authorization', `Bearer ${user.body.tokenData.token}`)
    .send({
      title: 'Sample Book',
      author: 'John Doe',
      type: 'Fiction',
      year: 2023,
      feedBack: 3,
      publisher: 'Sample Publisher',
      userMail: 'jane2.doe@gmail.com',
    });
  const book2 = await supertest(app)
    .post(`${baseURL}/books`)
    .set('Authorization', `Bearer ${user.body.tokenData.token}`)
    .send({
      title: 'Sample Book 2',
      author: 'John Doe',
      type: 'Fiction',
      year: 2023,
      feedBack: 3,
      publisher: 'Sample Publisher',
      userMail: 'jane2.doe@gmail.com',
    });

  const book3 = await prisma?.book.findFirst();

  it('should delete a book', async () => {
    const response = await supertest(app)
      .delete(`${baseURL}/books/${book1.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({ userId });

    expect(response.status).toBe(204);
  });

  it('should return 403 if user ids does not match', async () => {
    const response = await supertest(app)
      .delete(`${baseURL}/books/${book2.body.book.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({ userId: 'invalid_id' });

    expect(response.status).toBe(403);
  });

  it('should delete a book with admin user', async () => {
    const response = await supertest(app)
      .delete(`${baseURL}/books/${book3!.id}`)
      .set('Authorization', `Bearer ${user.body.tokenData.token}`)
      .send({ userId: userAdmin!.id });

    expect(response.status).toBe(204);
  });
});
