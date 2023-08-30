import supertest from 'supertest';
import app from '..';

const baseURL = '/api/v1';

describe('POST /refresh', async () => {
  const body = {
    email: 'john2.doe@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'A7erT!Gh',
  };

  await supertest(app).post(`${baseURL}/users`).send(body);

  it('should refresh the token with valid authorization', async () => {
    const loginData = {
      email: 'john2.doe@gmail.com',
      password: 'A7erT!Gh',
    };

    const login = await supertest(app).post(`${baseURL}/login`).send(loginData);
    const token = login.body.refreshTokenData.token;

    const response = await supertest(app).post(`${baseURL}/refresh`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tokenData');
    expect(response.body).toHaveProperty('refreshTokenData');
  });

  it('should not refresh the token with missing or invalid authorization', async () => {
    const invalidToken = 'invalid_token';

    const response = await supertest(app).post(`${baseURL}/refresh`).set('Authorization', `Bearer ${invalidToken}`);

    expect(response.status).toBe(401);
  });
});
