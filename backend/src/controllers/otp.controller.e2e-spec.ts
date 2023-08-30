import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '..';

const baseURL = '/api/v1';

describe('POST /otp', () => {
  it('should create and send OTP', async () => {
    const validData = {
      email: "john2.doe@gmail.com",
      subject: "Récupération mot de passe",
      message: "Validation pour changer le mot de passe",
      duration: 1
    }

    const response = await supertest(app)
      .post(`${baseURL}/otp`)
      .send(validData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toEqual(validData.email);
    expect(response.body).toHaveProperty('otp');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('expiresAt');
  });

  it('should not create and send OTP with invalid email', async () => {
    const invalidData = {
      email: "invalid_email",
      subject: "Récupération mot de passe",
      message: "Validation pour changer le mot de passe",
      duration: 1
    }

    const response = await supertest(app)
      .post(`${baseURL}/otp`)
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should not create and send OTP with missing data', async () => {
    const missingData = {
      // Missing email, subject, message, and duration
    };

    const response = await supertest(app)
      .post(`${baseURL}/otp`)
      .send(missingData);

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });

  it('should not create and send OTP with invalid duration', async () => {
    const invalidDurationData = {
      email: 'john2.doe@gmail.com',
      subject: 'Récupération mot de passe',
      message: 'Validation pour changer le mot de passe',
      duration: 'invalid_duration',
    };

    const response = await supertest(app)
      .post(`${baseURL}/otp`)
      .send(invalidDurationData);

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('error');
  });
})

