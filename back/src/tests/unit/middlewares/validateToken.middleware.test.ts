import userMocks from '../../mocks/user.mock';
import RestError from '../../../errors/rest.error';
import mockExpressParams from '../../utils/mockExpressParams';
import validateToken from '../../../middlewares/validateToken.middleware';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as getJwtSecret from '../../../auth/getJwtSecret';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Tests validateToken.middleware', () => {
  const JWT_SECRET = 'secret';

  beforeEach(() => {
    Sinon.stub(jwt, 'verify');
    Sinon.stub(getJwtSecret, 'getJwtSecret').returns(JWT_SECRET);
  });

  afterEach(() => {
    (jwt.verify as Sinon.SinonStub).restore();
    (getJwtSecret.getJwtSecret as Sinon.SinonStub).restore();
  });

  it('Should throw an error if the cookie is not passed', () => {
    const { req, res, next } = mockExpressParams({ cookies: {} });

    try {
      validateToken(req, res, next);
    } catch (error) {
      const err = error as RestError;
      expect(err.status).to.equal(401);
      expect(err.message).to.equal('Token not found!');
    }
  });

  it('Should throw an error if the cookie is invalid', () => {
    (jwt.verify as Sinon.SinonStub).throws(new Error('Error'));
    const { req, res, next } = mockExpressParams({
      cookies: {
        auth_token: userMocks.token,
      },
    });

    try {
      validateToken(req, res, next);
    } catch (error) {
      const err = error as RestError;
      expect(err.status).to.equal(401);
      expect(err.message).to.equal('Invalid token!');
    }
  });

  it('Should call next and modify req.user if token is valid', () => {
    (jwt.verify as Sinon.SinonStub).returns({
      ...userMocks.output,
      iat: 1516239022,
    });
    const { req, res, next } = mockExpressParams({
      cookies: {
        auth_token: userMocks.token,
      },
    });

    validateToken(req, res, next);

    expect(jwt.verify).to.have.been.calledWith(userMocks.token, JWT_SECRET);
    expect(req.user).to.deep.equal(userMocks.output);
    expect(next).to.have.been.calledOnce;
  });
});
