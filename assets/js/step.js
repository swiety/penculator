import { parse } from './calculator.js';

export function step(raw, field, direction) {
  if (!['mg', 'ml', 'clicks', 'fortieths'].includes(field) || ![-1, 1].includes(direction)) throw new Error('Invalid adjustment.');
  const text = String(raw ?? '').trim();
  if (!text && direction === -1) return '';
  const [numerator, denominator] = parse(text, field);
  const stepDenominator = field === 'ml' ? 10n : 1n;
  const commonDenominator = denominator * stepDenominator;
  const changed = numerator * stepDenominator + BigInt(direction) * denominator;
  const nonnegative = changed < 0n ? 0n : changed;
  const integer = nonnegative / commonDenominator;
  let remainder = nonnegative % commonDenominator;
  if (remainder === 0n) return String(integer);
  let fraction = '';
  while (remainder) {
    remainder *= 10n;
    fraction += String(remainder / commonDenominator);
    remainder %= commonDenominator;
  }
  return `${integer}.${fraction}`;
}
