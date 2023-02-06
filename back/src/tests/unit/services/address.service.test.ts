import userMocks from '../../mocks/user.mock';
import RestError from '../../../errors/rest.error';
import addressMocks from '../../mocks/address.mock';
import AddressService from '../../../services/address.service';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Unit tests for AddressService', () => {
  const addressRepository = {} as any;
  const userRepository = {} as any;

  beforeEach(() => {
    addressRepository.insert = Sinon.stub().resolves(addressMocks.output);
    userRepository.findById = Sinon.stub().resolves(userMocks.output);
  });

  afterEach(() => {
    addressRepository.insert.reset();
    userRepository.findById.reset();
  });

  const service = new AddressService(addressRepository, userRepository);

  describe('Tests for AddressService.insert', () => {
    it('Should return the newly created address', async () => {
      const resp = await service.insert(addressMocks.input);

      expect(resp).to.deep.equal(addressMocks.output);
      expect(addressRepository.insert).to.have.been.calledOnce;
      expect(userRepository.findById).to.have.been.calledOnce;
    });

    it('Should throw an error when the user does not exist', async () => {
      userRepository.findById.resolves(undefined);

      const err = await expect(
        service.insert(addressMocks.input)
      ).to.be.rejectedWith(RestError);

      expect(err.status).to.equal(404);
      expect(err.message).to.equal('User not found!');
    });

    it('Should throw an error when receiving an invalid value', async () => {
      for (const value of addressMocks.INVALID_VALUES) {
        const err = await expect(
          service.insert(value as any)
        ).to.be.rejectedWith(RestError);

        expect(err.status).to.equal(422);
      }
    });
  });
});
