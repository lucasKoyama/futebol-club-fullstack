import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches, inProgressMatches, finishedMatches } from './mocks/Match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
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
  afterEach(sinon.restore);
});