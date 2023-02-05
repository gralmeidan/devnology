import OrderService from '../../../services/order.service';
import RestError from '../../../errors/rest.error';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import db from '../../../database/models';
import productMocks from '../../mocks/product.mock';
import orderMocks from '../../mocks/order.mock';
import providerMocks from '../../mocks/provider.mock';

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Unit tests for OrderService', () => {
  const TRANSACTION = 'transaction';
  const orderRepository = {} as any;
  const orderProductRepository = {} as any;
  const providerRepository = {} as any;

  beforeEach(() => {
    orderProductRepository.insert = Sinon.stub().resolves(productMocks.output);
    orderProductRepository.findByIds = Sinon.stub().resolves(undefined);
    orderRepository.insert = Sinon.stub().resolves(orderMocks.createOutput);
    providerRepository.findByName = Sinon.stub().resolves(providerMocks.output);
    orderRepository.findByUser = Sinon.stub().resolves(orderMocks.arrOutput);
    Sinon.stub(db, 'transaction').callsFake((async (callback: Function) => {
      return callback(TRANSACTION);
    }) as any);
  });

  afterEach(() => {
    orderProductRepository.insert.reset();
    orderProductRepository.findByIds.reset();
    orderRepository.insert.reset();
    providerRepository.findByName.reset();
    (db.transaction as Sinon.SinonStub).restore();
  });

  const service = new OrderService(
    orderRepository,
    orderProductRepository,
    providerRepository
  );

  describe('Tests OrderService.placeOrder', () => {
    it('Should return the newly created order', async () => {
      const response = await service.placeOrder(orderMocks.input);

      expect(db.transaction).to.have.been.called;
      expect(response).to.deep.equal(orderMocks.createOutput);
      expect(orderRepository.insert).to.have.been.calledWith(orderMocks.input);
      expect(orderProductRepository.insert).to.have.been.calledThrice;
    });

    it('Should call orderProductRepository.insert with the correct values', async () => {
      await service.placeOrder(orderMocks.input);

      for (const product of orderMocks.input.products) {
        expect(orderProductRepository.insert).to.have.been.calledWith(
          orderMocks.createOutput.id,
          {
            ...product,
            provider: providerMocks.output,
          },
          TRANSACTION
        );
      }
    });

    it('Should throw an error when receiving an invalid value', async () => {
      for (const value of orderMocks.INVALID_VALUES) {
        const err = await expect(
          service.placeOrder(value as any)
        ).to.be.rejectedWith(RestError);

        expect(err.status).to.equal(422);
      }
    });

    it('Should throw an error when the provider does not exist', async () => {
      providerRepository.findByName.resolves(undefined);

      const err = await expect(
        service.placeOrder(orderMocks.input)
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('Provider not found!');
    });

    it('Should throw an error when the entry already exists', async () => {
      orderProductRepository.findByIds.resolves(orderMocks.createOutput);

      const err = await expect(
        service.placeOrder(orderMocks.input)
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(409);
      expect(err.message).to.equal('Duplicated product in Order!');
    });
  });

  describe('Tests OrderService.findByUser', () => {
    it('Should return an array of orders', async () => {
      const response = await service.findByUser(1);

      expect(response).to.deep.equal(orderMocks.arrOutput);
      expect(orderRepository.findByUser).to.have.been.calledWith(1);
    });

    it('Should throw an error when receiving an invalid value', async () => {
      const INVALID_VALUES = [undefined, 0, -1, 2.2, 'a', NaN, null];
      for (const value of INVALID_VALUES) {
        const err = await expect(
          service.findByUser(value as any)
        ).to.be.rejectedWith(RestError);

        expect(err.status).to.equal(422);
      }
    });
  });
});
