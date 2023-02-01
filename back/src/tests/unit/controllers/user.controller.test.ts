import UserController from '../../../controllers/user.controller';
import userMock from '../../mocks/user.mock';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import mockExpressParams from '../../utils/mockExpressParams';

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Unit tests for UserController', () => {
  const service = {
    insert: Sinon.stub().resolves(userMock.output),
    findByEmailAndPassword: Sinon.stub().resolves(userMock.output),
  } as any;

  beforeEach(() => {
    Sinon.stub(jwt, 'sign').returns(userMock.token as any);
  });

  afterEach(() => {
    (jwt.sign as Sinon.SinonStub).restore();
    service.insert.resetHistory();
  });

  const controller = new UserController(service);

  describe('Tests UserController.signUp', () => {
    it('Should return the newly added user', async () => {
      const { req, res } = mockExpressParams({ body: userMock.input });

      await controller.signUp(req, res);

      expect(service.insert).to.have.been.calledWith(userMock.input);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(userMock.output);
    });

    it('Should generate a token and set it as a cookie', async () => {
      const { req, res } = mockExpressParams({ body: userMock.input });

      await controller.signUp(req, res);

      expect(jwt.sign).to.have.been.calledWith(userMock.output);
      expect(res.cookie).to.have.been.calledWith(
        'auth_token',
        userMock.token,
        Sinon.match.hasOwn('expires')
      );
    });
  });

  describe('Tests UserController.signIn', () => {
    it('Should return the user', async () => {
      const { req, res } = mockExpressParams({ body: userMock.input });

      await controller.signIn(req, res);

      expect(service.findByEmailAndPassword).to.have.been.calledWith(
        userMock.input.email,
        userMock.input.password
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(userMock.output);
    });

    it('Should generate a token and set it as a cookie', async () => {
      const { req, res } = mockExpressParams({ body: userMock.input });

      await controller.signIn(req, res);

      expect(jwt.sign).to.have.been.calledWith(userMock.output);
      expect(res.cookie).to.have.been.calledWith(
        'auth_token',
        userMock.token,
        Sinon.match.hasOwn('expires')
      );
    });

    it('Should not throw when the body is undefined', async () => {
      const { req, res } = mockExpressParams({ body: undefined });

      await expect(controller.signIn(req, res)).not.to.be.rejected;
      expect(service.findByEmailAndPassword).to.have.been.calledWith(
        undefined,
        undefined
      );
    });
  });
});
