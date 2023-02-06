import userMock from '../../mocks/user.mock';
import addressMocks from '../../mocks/address.mock';
import mockExpressParams from '../../utils/mockExpressParams';
import AddressController from '../../../controllers/address.controller';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Unit tests for AddressController', () => {
  const service = {
    insert: Sinon.stub().resolves(addressMocks.output),
    findByUser: Sinon.stub().resolves(addressMocks.arrOutput),
  } as any;

  afterEach(() => {
    service.insert.resetHistory();
    service.findByUser.resetHistory();
  });

  const controller = new AddressController(service);

  describe('Tests AddressController.insert', () => {
    it('Should return the newly placed order', async () => {
      const { req, res } = mockExpressParams({
        body: addressMocks.input,
        user: userMock.output,
      });

      await controller.insert(req, res);

      expect(service.insert).to.have.been.calledWith({
        ...addressMocks.input,
        userId: userMock.output.id,
      });
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(addressMocks.output);
    });

    it('Should throw an error if the user is not provided', async () => {
      const { req, res } = mockExpressParams({ body: addressMocks.output });

      expect(controller.insert(req, res)).to.be.rejectedWith(
        new Error('User was not provided!')
      );
    });
  });

  describe('Tests AddressController.getByRequestingUser', () => {
    it('Should return an array of addresses', async () => {
      const { req, res } = mockExpressParams({
        user: userMock.output,
      });

      await controller.getByRequestingUser(req, res);

      expect(service.findByUser).to.have.been.calledWith(userMock.output.id);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(addressMocks.arrOutput);
    });

    it('Should throw an error if the user is not provided', async () => {
      const { req, res } = mockExpressParams();

      expect(controller.getByRequestingUser(req, res)).to.be.rejectedWith(
        new Error('User was not provided!')
      );
    });
  });
});
