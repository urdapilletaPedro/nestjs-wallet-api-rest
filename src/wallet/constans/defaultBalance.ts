export enum CurrencyCode {
  USD = 'USD',
  PYG = 'PYG',
  BTC = 'BTC',
  ETH = 'ETH',
}

export const defaultBalance = new Map<CurrencyCode, number>([
  [CurrencyCode.USD, 0],
  [CurrencyCode.PYG, 0],
  [CurrencyCode.BTC, 0],
  [CurrencyCode.ETH, 0],
]);

export function getDefaultBalance(): Map<string, number> {
  return new Map(defaultBalance);
}
