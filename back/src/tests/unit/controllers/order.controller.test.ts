import userMock from '../../mocks/user.mock';
import orderMocks from '../../mocks/order.mock';
import mockExpressParams from '../../utils/mockExpressParams';
import OrderController from '../../../controllers/order.controller';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Unit tests for OrderController', () => {
  const service = {
    placeOrder: Sinon.stub().resolves(orderMocks.createOutput),
    findByUser: Sinon.stub().resolves(orderMocks.arrOutput),
  } as any;

  afterEach(() => {
    service.placeOrder.resetHistory();
    service.findByUser.resetHistory();
  });

  const controller = new OrderController(service);

  describe('Tests OrderController.placeOrder', () => {
    it('Should return the newly placed order', async () => {
      const { req, res } = mockExpressParams({
        body: orderMocks.input,
        user: userMock.output,
      });

      await controller.placeOrder(req, res);

      expect(service.placeOrder).to.have.been.calledWith({
        ...orderMocks.input,
        userId: userMock.output.id,
      });
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(orderMocks.createOutput);
    });

    it('Should throw an error if the user is not provided', async () => {
      const { req, res } = mockExpressParams({ body: orderMocks.input });

      expect(controller.placeOrder(req, res)).to.be.rejectedWith(
        new Error('User was not provided!')
      );
    });
  });

  describe('Tests OrderController.getOrdersByRequestingUser', () => {
    it('Should return an array of orders', async () => {
      const { req, res } = mockExpressParams({
        user: userMock.output,
      });

      await controller.getOrdersByRequestingUser(req, res);

      expect(service.findByUser).to.have.been.calledWith(userMock.output.id);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(orderMocks.arrOutput);
    });

    it('Should throw an error if the user is not provided', async () => {
      const { req, res } = mockExpressParams();

      expect(controller.getOrdersByRequestingUser(req, res)).to.be.rejectedWith(
        new Error('User was not provided!')
      );
    });
  });
});
