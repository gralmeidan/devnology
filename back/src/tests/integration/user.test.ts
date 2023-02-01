import UserModel from '../../database/models/user.model';
import userMock from '../mocks/user.mock';
import { app } from '../../app';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';

const { expect } = chai;

describe('Test routes related to the User entity', () => {
  beforeEach(() => {
    Sinon.stub(UserModel, 'create').resolves({
      ...userMock.output,
      password: 'exposedPassword',
    } as any);
    Sinon.stub(jwt, 'sign').returns(userMock.token as any);
  });

  afterEach(() => {
    (UserModel.create as Sinon.SinonStub).restore();
    (jwt.sign as Sinon.SinonStub).restore();
  });

  describe('Tests POST /signup', () => {
    it('Should return the user and a set_cookie header', async () => {
      const res = await request(app).post('/signup').send(userMock.input);
      const [setCookieHeader] = res.header['set-cookie'];

      expect(res.status).to.equal(201);
      expect(res.body).to.deep.equal(userMock.output);
      expect(setCookieHeader).to.include(`auth_token=${userMock.token}`);
    });
    it('Should throw an error when receiving an invalid value', async () => {
      const [value] = userMock.INVALID_VALUES;
      const res = await request(app).post('/signup').send(value);

      expect(res.status).to.equal(422);
      expect(res.body).to.deep.equal({
        message: '"firstName" is required',
      });
    });
  });
});
