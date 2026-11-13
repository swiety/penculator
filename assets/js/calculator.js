import { pen } from './pen.js';

const fields = ['mg', 'ml', 'clicks', 'fortieths'];
const doseMg = BigInt(pen.doseMg);
const factors = { mg: [1n, 1n], ml: [doseMg * 10n, 6n], clicks: [doseMg, BigInt(pen.assumedClicks)], fortieths: [doseMg * 10n, 6n * 40n] };

export function parse(value, field) {
  const text = String(value ?? '').trim();
  if (!text) return [0n, 1n];
  const pattern = field === 'mg' || field === 'ml' ? /^\d+(?:[.,]\d+)?$/ : /^\d+$/;
  if (!pattern.test(text)) throw new Error(`Enter a non-negative ${field} value${field === 'clicks' || field === 'fortieths' ? ' as a whole number' : ''}.`);
  const [whole, fraction = ''] = text.replace(',', '.').split('.');
  return [BigInt(whole + fraction), 10n ** BigInt(fraction.length)];
}

function format(numerator, denominator) {
  const scaled = numerator * 10000n;
  const rounded = (scaled * 2n + denominator) / (2n * denominator);
  if (rounded === 0n) throw new Error('Amount is too small to display at the available precision.');
  const integer = rounded / 10000n;
  const fraction = (rounded % 10000n).toString().padStart(4, '0').replace(/0+$/, '');
  return { value: fraction ? `${integer}.${fraction}` : `${integer}`, approximate: scaled % denominator !== 0n };
}

export function calculate(input) {
  let numerator = 0n;
  let denominator = 1n;
  let usesClicks = false;
  for (const field of fields) {
    const [value, scale] = parse(input[field], field);
    const [factorN, factorD] = factors[field];
    numerator = numerator * scale * factorD + value * factorN * denominator;
    denominator *= scale * factorD;
    if (field === 'clicks' && value > 0n) usesClicks = true;
  }
  if (numerator === 0n) throw new Error('Enter at least one positive amount.');
  if (numerator > doseMg * denominator) throw new Error('The total exceeds one labelled dose of 15 mg (0.6 ml).');
  return { mg: format(numerator, denominator), ml: format(numerator, denominator * 25n), usesClicks };
}
