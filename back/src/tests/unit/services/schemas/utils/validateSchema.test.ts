import validateSchema from '../../../../../services/schemas/utils/validateSchema';
import * as chai from 'chai';
import * as Joi from 'joi';
import RestError from '../../../../../errors/rest.error';

const { expect } = chai;

describe('Tests services/schemas/utils/validateSchema', () => {
  const schema = Joi.string();

  it('Should return the passed value when compliant with schema', () => {
    const input = 'lorem ipsum dolor sit amet';
    const output = validateSchema(schema, input);

    expect(output).to.equal(input);
  });

  it('Should throw an error when value is not compliant', () => {
    const input = '';

    expect(() => {
      validateSchema(schema, input);
    }).to.throw(RestError);
  });
});
