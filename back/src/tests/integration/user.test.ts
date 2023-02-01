import UserModel from '../../database/models/user.model';
import userMock from '../mocks/user.mock';
import { app } from '../../app';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';

const { expect } = chai;

describe('Test routes related to the User entity', () => {
  beforeEach(() => {
    Sinon.stub(UserModel, 'create').resolves({
      ...userMock.output,
      password: 'exposedPassword',
    } as any);
    Sinon.stub(UserModel, 'findOne').resolves();
    Sinon.stub(jwt, 'sign').returns(userMock.token as any);
    Sinon.stub(bcrypt, 'compare').resolves(true);
  });

  afterEach(() => {
    (UserModel.create as Sinon.SinonStub).restore();
    (UserModel.findOne as Sinon.SinonStub).restore();
    (bcrypt.compare as Sinon.SinonStub).restore();
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
    it('Should return an error when receiving an invalid value', async () => {
      const [value] = userMock.INVALID_VALUES;
      const res = await request(app).post('/signup').send(value);

      expect(res.status).to.equal(422);
      expect(res.body).to.deep.equal({
        message: '"firstName" is required',
      });
    });
  });

  describe('Tests POST /signin', () => {
    beforeEach(() => {
      (UserModel.findOne as Sinon.SinonStub).resolves({
        ...userMock.output,
        password: 'HashPassword',
      } as any);
    });

    it('Should return the user and a set_cookie header', async () => {
      const res = await request(app).post('/signin').send(userMock.signInInput);
      const [setCookieHeader] = res.header['set-cookie'];

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(userMock.output);
      expect(setCookieHeader).to.include(`auth_token=${userMock.token}`);
    });
    it('Should return an error when the password is invalid', async () => {
      (bcrypt.compare as Sinon.SinonStub).resolves(false);
      const res = await request(app).post('/signin').send(userMock.signInInput);

      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({
        message: 'Invalid password!',
      });
    });
  });
});
