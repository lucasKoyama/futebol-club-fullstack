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
  it('POST - /login, should return a token if all fields is informed correctly', async function () {
    const loginData = { "email": "admin@admin.com", "password": "secret_admin" };
    sinon.stub(SequelizeUser, 'findOne').resolves(validAdminUser as any);
    const { status, body } = await chai.request(app).post('/login').send(loginData);
    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  })
  afterEach(sinon.restore)
});

