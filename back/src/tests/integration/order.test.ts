import userMock from '../mocks/user.mock';
import orderMocks from '../mocks/order.mock';
import productMocks from '../mocks/product.mock';
import providerMocks from '../mocks/provider.mock';
import OrderModel from '../../database/models/order.model';
import ProviderModel from '../../database/models/provider.model';
import OrderProductModel from '../../database/models/orderProduct.model';
import { app } from '../../app';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';

const { expect } = chai;

describe('Test routes in /orders', () => {
  const COOKIE_STR = `auth_token=${userMock.token}`;

  beforeEach(() => {
    Sinon.stub(OrderProductModel, 'create').resolves(
      productMocks.output as any
    );
    Sinon.stub(OrderProductModel, 'findAll').resolves(undefined);
    Sinon.stub(OrderModel, 'create').resolves(orderMocks.createOutput as any);
    Sinon.stub(OrderModel, 'findAll').resolves(orderMocks.arrOutput as any);
    Sinon.stub(ProviderModel, 'findOne').resolves(providerMocks.output as any);
    Sinon.stub(jwt, 'verify').returns(userMock.output as any);
  });

  afterEach(() => {
    (OrderProductModel.create as Sinon.SinonStub).restore();
    (OrderProductModel.findAll as Sinon.SinonStub).restore();
    (OrderModel.create as Sinon.SinonStub).restore();
    (OrderModel.findAll as Sinon.SinonStub).restore();
    (ProviderModel.findOne as Sinon.SinonStub).restore();
    (jwt.verify as Sinon.SinonStub).restore();
  });

  describe('Tests POST /orders', () => {
    it('Should return the order', async () => {
      const res = await request(app)
        .post('/orders')
        .send(orderMocks.input)
        .set('Cookie', COOKIE_STR);

      expect(res.status).to.equal(201);
      expect(res.body).to.deep.equal(orderMocks.createOutput);
    });

    it('Should return an error when the token is not passed', async () => {
      const res = await request(app).post('/orders').send(orderMocks.input);

      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({
        message: 'Token not found!',
      });
    });
  });

  describe('Tests GET /orders', () => {
    it('Should return the order', async () => {
      const res = await request(app).get('/orders').set('Cookie', COOKIE_STR);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(orderMocks.arrOutput);
    });

    it('Should return an error when the token is not passed', async () => {
      const res = await request(app).get('/orders');

      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({
        message: 'Token not found!',
      });
    });
  });
});
