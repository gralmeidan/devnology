import UserService from '../../../services/user.service';
import RestError from '../../../errors/rest.error';
import userMock from '../../mocks/user.mock';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as bcrypt from 'bcrypt';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Unit tests for UserService', () => {
  const repository = {
    insert: Sinon.stub().resolves({
      ...userMock.output,
      password: 'senha123',
    }),
  } as any;

  beforeEach(() => {
    Sinon.stub(bcrypt, 'hash').resolves('HashPassword');
  });

  afterEach(() => {
    (bcrypt.hash as Sinon.SinonStub).restore();
    repository.insert.resetHistory();
  });

  const service = new UserService(repository);

  describe('Tests UserService.insert', () => {
    it('Should encrypt the password and return the newly created user', async () => {
      const response = await service.insert(userMock.input);

      expect(response).to.deep.equal(userMock.output);
      expect(repository.insert).to.have.been.calledWith({
        ...userMock.input,
        password: 'HashPassword',
      });
    });

    it('Should throw an error when receiving an invalid value', async () => {
      for (const value of userMock.INVALID_VALUES) {
        const err = await expect(
          service.insert(value as any)
        ).to.be.rejectedWith(RestError);

        expect(err.status).to.equal(422);
      }
    });
  });
});
