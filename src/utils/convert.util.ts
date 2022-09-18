import { BigNumber } from 'bignumber.js';

const FIXED_POINT_128_MULTIPLIER = new BigNumber(2).pow(128);

export const dateColumnTransformer = {
  from: (value: string | null) =>
    value ? new Date(value).toISOString() : value,
  to: (value: string | null) => (value ? new Date(value).toISOString() : value),
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
