import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { validAdminUser } from './mocks/User.mock'

chai.use(chaiHttp);

const { expect } = chai

describe('Users test', () => {
  it('POST - /login, should return status 400 due to lack of email field', async function () {
    const missingEmail = { "email": "", "password": "secret_admin" };
    const { status } = await chai.request(app).post('/login').send(missingEmail);
    expect(status).to.equal(400);
  });

  it('POST - /login, should return status 400 due to lack of password field', async function () {
    const missingPassword = { "email": "admin@admin.com", "password": "" };
    const { status } = await chai.request(app).post('/login').send(missingPassword);
    expect(status).to.equal(400);
  });

  it('POST - /login, should return status 401 due to invalid email', async function () {
    const invalidEmail = { "email": "admin@admin", "password": "secret_admin" };
    const { status } = await chai.request(app).post('/login').send(invalidEmail);
    expect(status).to.equal(401);
  });

  it('POST - /login, should return status 401 due to invalid email', async function () {
    const invalidLengthPassword = { "email": "admin@admin.com", "password": "secre" };
    const { status } = await chai.request(app).post('/login').send(invalidLengthPassword);
    expect(status).to.equal(401);
  });

  it('POST - /login, should return status 401 due to non-existing user', async function () {
    const invalidLengthPassword = { "email": "admin2@admin.com", "password": "secret_admin" };
    const { status } = await chai.request(app).post('/login').send(invalidLengthPassword);
    expect(status).to.equal(401);
  });

  it('POST - /login, should return a token if all fields is informed correctly', async function () {
    const loginData = { "email": "admin@admin.com", "password": "secret_admin" };
    sinon.stub(SequelizeUser, 'findOne').resolves(validAdminUser as any);
    const { status, body } = await chai.request(app).post('/login').send(loginData);
    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });
  afterEach(sinon.restore)
});

