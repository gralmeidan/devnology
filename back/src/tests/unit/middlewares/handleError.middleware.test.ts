import RestError from '../../../../src/errors/rest.error';
import handleError from '../../../../src/middlewares/handleError.middleware';
import mockExpressParams from '../../utils/mockExpressParams';
import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

const { expect } = chai;

describe('Tests handleError.middleware', () => {
  before(() => {
    Sinon.stub(console, 'log');
  });

  after(() => {
    (console.log as Sinon.SinonStub).restore();
  });

  it('Should return the error and the custom message if receiving a RestError', () => {
    const err = new RestError(404, 'Product not found');
    const { req, res, next } = mockExpressParams();

    handleError(err, req, res, next);

    expect(res.status).to.have.been.calledWith(err.status);
    expect(res.json).to.have.been.calledWith({
      message: err.message,
    });
  });

  it('Should return status 500 and a generic message if receiving any other error', () => {
    const err = new Error('Everything crashed');
    const { req, res, next } = mockExpressParams();

    handleError(err, req, res, next);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({
      message: 'Something went wrong',
    });
    expect(console.log).to.have.been.calledWith(err);
  });
});
