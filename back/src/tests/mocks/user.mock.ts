const input = {
  firstName: 'Lorem',
  lastName: 'Ipsum',
  password: 'senha123',
  email: 'lorem_ipsum@hotmail.com',
};

const output = {
  id: 1,
  firstName: 'Lorem',
  lastName: 'Ipsum',
  email: 'lorem_ipsum@hotmail.com',
};

const INVALID_VALUES = [
  { ...input, firstName: undefined },
  { ...input, lastName: undefined },
  { ...input, password: undefined },
  { ...input, email: undefined },
  { ...input, firstName: '' },
  { ...input, lastName: '' },
  { ...input, password: '' },
  { ...input, email: '' },
  { ...input, firstName: 1 },
  { ...input, lastName: true },
  { ...input, password: {} },
  { ...input, email: false },
  { ...input, email: 'string' },
];

const token = 'TOKEN';

const userMocks = {
  input,
  output,
  INVALID_VALUES,
  token,
};

export default userMocks;
