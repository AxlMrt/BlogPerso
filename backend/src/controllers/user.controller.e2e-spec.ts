import { describe, it, expect } from 'vitest';
import prisma from '../../prisma/lib/prisma';
import supertest from 'supertest';
import app from '..';

const baseURL = '/api/v1';
const invalidUserId = 'invalid_id';

describe('POST /users', async () => {
  it('should return created user with token', async () => {
    const body = {
      email: 'john2.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!Gh',
    };

    const response = await supertest(app).post(`${baseURL}/users`).send(body);

    const createdUser = response.body.others;
    const createdToken = response.body.tokenData;

    expect(response.status).toEqual(201);
    expect(createdUser).toBeDefined();
    expect(createdToken).toBeDefined();
    expect(createdUser.password).toBeUndefined();
  });

  it('should create new user case insensitive', async () => {
    const body = {
      email: 'joHn.DoE@gMail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!Gh',
    };

    const response = await supertest(app).post(`${baseURL}/users`).send(body);

    const createdUser = response.body.others;
    const { email, firstName, lastName } = createdUser;

    expect(response.status).toEqual(201);
    expect(email).toBe(body.email.toLowerCase());
    expect(firstName).toBe(body.firstName.toLowerCase());
    expect(lastName).toBe(body.lastName.toLowerCase());
  });

  it('should return 409 user already exist', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!Gh',
    };

    await supertest(app).post(`${baseURL}/users`).send(body);

    const response = await supertest(app).post(`${baseURL}/users`).send(body);
    expect(response.status).toBe(409);
  });

  it('should return 400 invalid password', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'azerty',
    };

    const response = await supertest(app).post(`${baseURL}/users`).send(body);
    expect(response.status).toBe(400);
  });

  it('should return 400 invalid email', async () => {
    const body = {
      email: 'nouvel_utilisateur',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!Gh',
    };

    const response = await supertest(app).post(`${baseURL}/users`).send(body);
    expect(response.status).toBe(400);
  });

  it('should return an error if data is missing', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: '',
      password: 'A7erT!Gh',
    };

    const response = await supertest(app).post(`${baseURL}/users`).send(body);
    expect(response.status).toBe(409);
  });

  it('should return an error if there is more data', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!Gh',
      role: 'ADMIN',
    };

    const response = await supertest(app).post(`${baseURL}/users`).send(body);
    expect(response.status).toBe(400);
  });
});

describe('GET /users', async () => {
  const superUser = await prisma.user.create({
    data: {
      email: 'axel@admin.fr',
      firstName: 'Axel',
      lastName: 'Admin',
      password: 'azerty',
      role: 'ADMIN',
    }
  });

  it('return users', async () => {
    
    const response = await supertest(app).get(`${baseURL}/users`).send(superUser);

    expect(response.status).toBe(200);
  });
});

describe('GET /users/:id', async () => {
  const superUser = await prisma.user.create({
    data: {
      email: 'Marie-Anne@admin.fr',
      firstName: 'Axel',
      lastName: 'Admin',
      password: 'azerty',
      role: 'ADMIN',
    }
  });

  const createdBody = {
      email: 'test.Get@gmail.com',
      firstName: 'Get',
      lastName: 'Get',
      password: 'A7erT!Gh',
  };

  const response = await supertest(app).post(`${baseURL}/users`).send(createdBody);
  const createdUser = response.body.others;

  it('should return details of existing user', async () => {
    const response = await supertest(app).get(`${baseURL}/users/${createdUser.id}`).send(superUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('firstName');
    expect(response.body).toHaveProperty('lastName');
    expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('photo');
    expect(response.body).toHaveProperty('role');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('books');
  });

  it("should return 404 if user doesn't exist", async () => {
    const response = await supertest(app).get(`${baseURL}/users/${invalidUserId}`).send(superUser);

    expect(response.status).toBe(404);
  })
});

describe('PUT /users/:id', async () => {
  const superUser = await prisma.user.create({
    data: {
      email: 'Third@admin.fr',
      firstName: 'Axel',
      lastName: 'Admin',
      password: 'azerty',
      role: 'ADMIN',
    }
  });

  const createdBody = {
      email: 'test@gmail.com',
      firstName: 'Put',
      lastName: 'Put',
      password: 'A7erT!Gh',
  };

  const response = await supertest(app).post(`${baseURL}/users`).send(createdBody);
  const createdUser = response.body.others;

  it('should update user', async () => {
    const body = {
      email: 'john.test@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
    };

    const response = await supertest(app).put(`${baseURL}/users/${createdUser.id}`).send({ ...body, id: createdUser.id });
    expect(response.status).toEqual(200);
  });

  it('should update with admin role', async () => {
    const body = {
      email: 'Jane.test@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
    };

    const response = await supertest(app).put(`${baseURL}/users/${superUser.id}`).send({ ...body, id: createdUser.id });

    expect(response.status).toEqual(200);
  });

  it('should update user with missing data', async () => {
    const body = {
      email: 'joHn.Updated@gMail.com',
      firstName: '',
      lastName: 'Doe',
    };

    expect(createdUser.email).toBe(createdBody.email);

    const response = await supertest(app).put(`${baseURL}/users/${createdUser.id}`).send({...body, id: createdUser.id});
    const updatedUser = response.body;
    expect(response.status).toEqual(200);
    expect(updatedUser.email).toBe(body.email.toLowerCase());
    expect(updatedUser.firstName).toBeDefined();
  });
  
  it('should update user case insensitive', async () => {
    const body = {
      email: 'joHn.UpDated@gMail.com',
      firstName: 'Jane',
      lastName: 'Doe',
    };

    const response = await supertest(app).put(`${baseURL}/users/${createdUser.id}`).send({...body, id: createdUser.id});
    const updatedUser = response.body;
    const { email, firstName, lastName } = updatedUser;

    expect(response.status).toEqual(200);
    expect(email).toBe(body.email.toLowerCase());
    expect(firstName).toBe(body.firstName.toLowerCase());
    expect(lastName).toBe(body.lastName.toLowerCase());
  });
 
  it('should return an error if there is more data', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'A7erT!Gh',
      role: 'ADMIN',
    };

    const response = await supertest(app).put(`${baseURL}/users/${createdUser.id}`).send({...body, id: createdUser.id});
    expect(response.status).toBe(400);
  });

  it('should return 400 invalid email', async () => {
    const body = {
      email: 'nouvel_utilisateur',
    };

    const response = await supertest(app).put(`${baseURL}/users/${createdUser.id}`).send({...body, id: createdUser.id});
    expect(response.status).toBe(400);
  });

  it('should return 409 user already exist', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'Jane',
    };

    const response = await supertest(app).put(`${baseURL}/users/${createdUser.id}`).send({...body, id: createdUser.id});

    expect(response.status).toBe(409);
  });

  it('should return 403 Forbidden access', async () => {
    const body = {
      email: 'john.doe@gmail.com',
      firstName: 'Jane',
    };

    const response = await supertest(app).put(`${baseURL}/users/${invalidUserId}`).send({...body, id: createdUser.id});

    expect(response.status).toBe(403);
  });
});

describe('DELETE /users/:id', async () => {
  const user1 = await prisma.user.create({ data: { email: 'lalalolo@lolilo.fr', firstName: 'Lolo', lastName: 'lolo', password: 'Lolilo', role: 'ADMIN' } });
  const user2 = await prisma.user.create({ data: { email: 'lalalala@lolilo.fr', firstName: 'Lala', lastName: 'lala', password: 'Lolilo' } });
  const user3 = await prisma.user.create({ data: { email: 'lalalele@lolilo.fr', firstName: 'Lele', lastName: 'lele', password: 'Lolilo' } });

  it('should return 403 forbidden', async () => {
    const response = await supertest(app).delete(`${baseURL}/users/${user2.id}`).send(user3);
    expect(response.status).toBe(403);
  })

  it('should delete user', async () => {
    const totalUserInDb = await prisma.user.count();

    const response = await supertest(app).delete(`${baseURL}/users/${user2.id}`).send(user2);
    expect(response.status).toBe(200);
    const totalUserInDbAfterDel = await prisma.user.count();

    expect(totalUserInDb - totalUserInDbAfterDel).toEqual(1);
  });

  it('should delete user with admin ID', async () => {
    const totalUserInDb = await prisma.user.count();
    const response = await supertest(app).delete(`${baseURL}/users/${user1.id}`).send(user3);
    expect(response.status).toBe(200);
    const totalUserInDbAfterDel = await prisma.user.count();

    expect(totalUserInDb - totalUserInDbAfterDel).toEqual(1);
  });
});