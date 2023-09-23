import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches } from './mocks/Match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  it('GET - /matches, should return all matches', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  })
  afterEach(sinon.restore);
});