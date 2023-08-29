import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '..';

const baseURL = '/api/v1';

describe('POST /login', async () => {
  const data = {
    email: 'john2.doe@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'A7erT!Gh',
  }
  await supertest(app).post(`${baseURL}/users`).send(data);

  it('should connect with good credentials', async () => {
    const loginData = {
      email: 'john2.doe@gmail.com',
      password: 'A7erT!Gh',
    }

    const response = await supertest(app).post(`${baseURL}/login`).send(loginData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('others');
    expect(response.body).toHaveProperty('tokenData');
    expect(response.body).toHaveProperty('refreshTokenData');
  });

  it('should return 401 wrong credentials', async () => {
    const loginData = {
      email: 'john2.doe@gmail.com',
      password: 'A7ert!gh',
    }
    const response = await supertest(app).post(`${baseURL}/login`).send(loginData);
    expect(response.status).toEqual(401);
  });

  it('should return 400 if there is no data', async () => {
    const response = await supertest(app).post(`${baseURL}/login`);

    expect(response.status).toEqual(400);
  });

  it('should return 400 if email is missing', async () => {
    const loginData = {
      password: 'securepassword',
    };

    const response = await supertest(app).post(`${baseURL}/login`).send(loginData);

    expect(response.status).toEqual(400);
  });

  it('should return 400 if password is missing', async () => {
    const loginData = {
      email: 'john2.doe@gmail.com',
    };
    const response = await supertest(app).post(`${baseURL}/login`).send(loginData);
    expect(response.status).toEqual(400);
  });

  it('should return 400 is email is invalid', async () => {
    const loginData = {
      email: 'invalidemail',
      password: 'securepassword',
    };

    const response = await supertest(app).post(`${baseURL}/login`).send(loginData);

    expect(response.status).toEqual(400);
  });

  it("should return 404 user doesn't exist", async () => {
    const loginData = {
      email: 'jane.doe@gmail.com',
      password: 'A7ert!gh',
    }
    const response = await supertest(app).post(`${baseURL}/login`).send(loginData);
    expect(response.status).toEqual(404);
  });
});

describe('POST /login/logout', () => {
  it('should logout and redirect to login page', async () => {
    const loginData = {
      email: 'john2.doe@gmail.com',
      password: 'A7erT!Gh',
    }

    const login = await supertest(app).post(`${baseURL}/login`).send(loginData);
    expect(login.status).toEqual(200);

    const response = await supertest(app).post(`${baseURL}/login/logout`).send(loginData);
    expect(response.status).toEqual(302);
    expect(response.header['location']).toBe('/login');
  });
})