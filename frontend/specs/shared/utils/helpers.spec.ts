import { default as utils } from '@/shared/utils';

describe('formatNumberAsMoney', () => {
  it('should format a number as money correctly', () => {
    const amount = 1234.5678;
    expect(utils.formatNumberAsMoney(amount)).toEqual('$1,234.57');
  });

  it('should return undefined for falsy input', () => {
    expect(utils.formatNumberAsMoney(undefined)).toBeUndefined();
  });
});

describe('formatStayDate', () => {
  it('should format a date string correctly', () => {
    const dateString = '2024-02-06';
    expect(utils.formatStayDate(dateString)).toEqual('2024-02-06');
  });

  it('should return undefined for falsy input', () => {
    expect(utils.formatStayDate('')).toBeUndefined();
  });
});

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a string', () => {
    const string = 'hello world';
    expect(utils.capitalizeFirstLetter(string)).toEqual('Hello world');
  });
});


