import { checkNumber } from './utils';

describe('utils', () => {
  it('return is number', () => {
    expect(checkNumber(1)).toEqual(true);
  });

  it('return is not number', () => {
    expect(checkNumber('1')).toEqual(false);
  });
});
