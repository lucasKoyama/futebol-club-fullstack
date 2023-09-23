import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import {
  allMatches,
  inProgressMatches,
  finishedMatches,
  finishedMatch,
  updatedMatchScore,
  createdMatch,
} from './mocks/Match.mock';
import SequelizeUser from '../database/models/SequelizeUser';
import { validAdminUser } from './mocks/User.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  const loginToGetToken = async () => {
    const loginData = { "email": "admin@admin.com", "password": "secret_admin" };
    sinon.stub(SequelizeUser, 'findOne').resolves(validAdminUser as any);
    const { body: loginResponse } = await chai.request(app).post('/login').send(loginData);
    return loginResponse.token;
  }

  it('GET - /matches, should return all matches', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });

  it('GET - /matches, should return all matches in progress', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(inProgressMatches as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(inProgressMatches);
  });

  it('GET - /matches, should return all matches finished', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(finishedMatches as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(finishedMatches);
  });

  it('PATCH - /matches/:id/finish, should finish the match specified by the ID, meaning inProgress field set to false', async function () {
    const token = await loginToGetToken();
    // finish match test
    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(finishedMatch as any);
    const { status, body } = await chai.request(app).patch('/matches/41/finish')
      .set({ "Authorization": `Bearer ${token}` });
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished'});
  });

  it('PATCH - /matches/:id, should update the score of the match specified by the ID', async function () {
    const token = await loginToGetToken();
    // finish match test
    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(updatedMatchScore as any);
    const { status } = await chai.request(app).patch('/matches/41')
      .send({ homeTeamGoals: 1, awayTeamGoals: 1 })
      .set({ "Authorization": `Bearer ${token}` });
    expect(status).to.equal(200);
  });

  it('PATCH - /matches/:id, should return status 404 when trying to update a non-existing match', async function () {
    const token = await loginToGetToken();
    // finish match test
    sinon.stub(SequelizeMatch, 'update').resolves([0] as any);
    const { status } = await chai.request(app).patch('/matches/200')
      .send({ homeTeamGoals: 1, awayTeamGoals: 1 })
      .set({ "Authorization": `Bearer ${token}` });
    expect(status).to.equal(404);
  });

  it('POST - /matches, should return status 201 and the created match', async function () {
    const token = await loginToGetToken();
    sinon.stub(SequelizeMatch, 'create').resolves(createdMatch as any);
    const { status, body } = await chai.request(app).post('/matches')
      .send({
        homeTeamId: 16,
        homeTeamGoals: 2,
        awayTeamId: 9,
        awayTeamGoals: 2,
      }).set({ "Authorization": `Bearer ${token}` });
    expect(status).to.equal(201);
    expect(body).to.deep.equal(createdMatch);
  });
  afterEach(sinon.restore);
});