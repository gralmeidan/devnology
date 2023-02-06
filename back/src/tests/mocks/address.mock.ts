const input = {
  userId: 1,
  street: 'Av. Paulista',
  number: '12 - 34',
  city: 'São Paulo',
  cep: '01153-000',
  state: 'SP',
};

const output = {
  id: 1,
  userId: 1,
  street: 'Av. Paulista',
  number: '12 - 34',
  city: 'São Paulo',
  cep: '01153-000',
  state: 'SP',
};

const INVALID_VALUES = [
  { ...input, userId: 0 },
  { ...input, userId: -1 },
  { ...input, userId: 'NaN' },
  { ...input, userId: undefined },
  { ...input, street: undefined },
  { ...input, street: 1 },
  { ...input, number: undefined },
  { ...input, number: 1 },
  { ...input, city: undefined },
  { ...input, city: 1 },
  { ...input, cep: undefined },
  { ...input, cep: 1 },
  { ...input, cep: '123-22' },
  { ...input, cep: '123400000' },
  { ...input, cep: 'MT' },
  { ...input, state: undefined },
  { ...input, state: 1 },
  { ...input, state: '123-22' },
];

const addressMocks = {
  output,
  input,
  INVALID_VALUES,
  arrOutput: Array(3).fill(output),
};

export default addressMocks;
