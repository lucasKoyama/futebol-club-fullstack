import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeLeaderBoard from '../database/models/SequelizeLeaderBoard';
import { leaderBoard, homeLeaderBoard, awayLeaderBoard } from './mocks/Leaderboard.mock';

chai.use(chaiHttp);

import { expect } from 'chai';

describe('Leaderboard test', () => {
  it('GET - /leaderboard, should return the leaderboard', async function () {
    sinon.stub(SequelizeLeaderBoard, 'findAll').resolves(leaderBoard as any);
    const { status, body } = await chai.request(app).get('/leaderboard');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderBoard);
  });

  it('GET - /leaderboard/home, should return the home team leaderboard', async function () {
    sinon.stub(SequelizeLeaderBoard, 'findAll').resolves(homeLeaderBoard as any);
    const { status, body } = await chai.request(app).get('/leaderboard/home');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(homeLeaderBoard);
  });

  it('GET - /leaderboard/away, should return the away team leaderboard', async function () {
    sinon.stub(SequelizeLeaderBoard, 'findAll').resolves(awayLeaderBoard as any);
    const { status, body } = await chai.request(app).get('/leaderboard/away');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(awayLeaderBoard);
  });
  afterEach(sinon.restore);
})
