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
  const repository = {} as any;

  beforeEach(() => {
    repository.insert = Sinon.stub().resolves({
      ...userMock.output,
      password: 'senha123',
    });
    repository.findByEmail = Sinon.stub().resolves();
    Sinon.stub(bcrypt, 'hash').resolves('HashPassword');
    Sinon.stub(bcrypt, 'compare').resolves(true);
  });

  afterEach(() => {
    (bcrypt.hash as Sinon.SinonStub).restore();
    (bcrypt.compare as Sinon.SinonStub).restore();
    repository.findByEmail.resetHistory();
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

    it('Should throw an error if the email is already registered', async () => {
      repository.findByEmail.resolves(userMock.output);

      const err = await expect(
        service.insert(userMock.input)
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(409, 'Email already registered!');
    });
  });

  describe('Tests UserService.findByEmailAndPassword', () => {
    beforeEach(() => {
      repository.findByEmail.resolves({
        ...userMock.output,
        password: 'HashPassword',
      });
    });

    it('Should return the user', async () => {
      const response = await service.findByEmailAndPassword(
        userMock.input.email,
        userMock.input.password
      );

      expect(response).to.deep.equal(userMock.output);
    });

    it('Should throw an error when the password is invalid', async () => {
      (bcrypt.compare as Sinon.SinonStub).resolves(false);

      const err = await expect(
        service.findByEmailAndPassword(
          userMock.input.email,
          userMock.input.password
        )
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(401);
      expect(err.message).to.equal('Invalid password!');
    });

    it('Should throw an error when the user is not found', async () => {
      repository.findByEmail.resolves(undefined);

      const err = await expect(
        service.findByEmailAndPassword(
          userMock.input.email,
          userMock.input.password
        )
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('User not found!');
    });
  });
});
