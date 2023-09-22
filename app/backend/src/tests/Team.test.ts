import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';  
import { teams } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  it('GET - /teams, should return all teams', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams)
  });
  afterEach(sinon.restore);
});
