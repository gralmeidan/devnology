import userMock from '../mocks/user.mock';
import addressMocks from '../mocks/address.mock';
import AddressModel from '../../database/models/address.model';
import { app } from '../../app';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import UserModel from '../../database/models/user.model';

const { expect } = chai;

describe('Test routes in /addresss', () => {
  const COOKIE_STR = `auth_token=${userMock.token}`;

  beforeEach(() => {
    Sinon.stub(AddressModel, 'create').resolves(addressMocks.output as any);
    Sinon.stub(AddressModel, 'findAll').resolves(addressMocks.arrOutput as any);
    Sinon.stub(UserModel, 'findOne').resolves(userMock.output as any);
    Sinon.stub(jwt, 'verify').returns(userMock.output as any);
  });

  afterEach(() => {
    (AddressModel.create as Sinon.SinonStub).restore();
    (AddressModel.findAll as Sinon.SinonStub).restore();
    (UserModel.findOne as Sinon.SinonStub).restore();
    (jwt.verify as Sinon.SinonStub).restore();
  });

  describe('Tests POST /address', () => {
    it('Should return the address', async () => {
      const res = await request(app)
        .post('/address')
        .send(addressMocks.input)
        .set('Cookie', COOKIE_STR);

      expect(res.status).to.equal(201);
      expect(res.body).to.deep.equal(addressMocks.output);
    });

    it('Should return an error when the token is not passed', async () => {
      const res = await request(app).post('/address').send(addressMocks.input);

      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({
        message: 'Token not found!',
      });
    });
  });

  describe('Tests GET /address', () => {
    it('Should return the address', async () => {
      const res = await request(app).get('/address').set('Cookie', COOKIE_STR);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(addressMocks.arrOutput);
    });

    it('Should return an error when the token is not passed', async () => {
      const res = await request(app).get('/address');

      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({
        message: 'Token not found!',
      });
    });
  });
});
