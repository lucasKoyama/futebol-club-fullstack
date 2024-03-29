import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';  
import { team, teams } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  it('GET - /teams, should return all teams', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams)
  });

  it('GET - /teams/:id, should return a team by id', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('GET - /teams/999, should return status 404 when trying to get a non-existing team', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null as any)
    const { status, body } = await chai.request(app).get('/teams/999');
    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Team not found!' })
  });
  afterEach(sinon.restore);
});
