import { BigNumber } from 'bignumber.js';

const FIXED_POINT_128_MULTIPLIER = new BigNumber(2).pow(128);

export const dateColumnTransformer = {
  from: (value: any) => {
    const type = typeof value;

    if (type === 'string' || type === 'number' || value instanceof Date) {
      return new Date(value).toISOString();
    } else {
      return value;
    }
  },
  to: (value: any) => {
    const type = typeof value;

    if (type === 'string' || type === 'number' || value instanceof Date) {
      return new Date(value).toISOString();
    } else {
      return value;
    }
  },
};

export const cumulativeToPrice = (cumulative: string, scale: number): string =>
  new BigNumber(cumulative)
    .div(FIXED_POINT_128_MULTIPLIER)
    .shiftedBy(scale)
    .toFixed(18);

export const timestampToDateString = (timestamp: string): string =>
  new Date(+timestamp * 1000).toISOString();

export const reservesToPrice = (
  firstReserve: string,
  secondReserve: string,
  scale: number,
): string =>
  new BigNumber(firstReserve).div(secondReserve).shiftedBy(scale).toFixed(18);
