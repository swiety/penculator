import { pen } from './pen.js';

export class InputError extends Error {
  constructor(code, message, field) { super(message); this.code = code; this.field = field; }
}

const fields = ['mg', 'ml', 'clicks', 'fortieths'];
export function parse(value, field) {
  const text = String(value ?? '').trim();
  if (!text) return [0n, 1n];
  const pattern = field === 'mg' || field === 'ml' ? /^\d+(?:[.,]\d+)?$/ : /^\d+$/;
  if (!pattern.test(text)) throw new InputError('invalid', `Enter a non-negative ${field} value${field === 'clicks' || field === 'fortieths' ? ' as a whole number' : ''}.`, field);
  const [whole, fraction = ''] = text.replace(',', '.').split('.');
  return [BigInt(whole + fraction), 10n ** BigInt(fraction.length)];
}

function format(numerator, denominator) {
  const scaled = numerator * 10000n;
  const rounded = (scaled * 2n + denominator) / (2n * denominator);
  if (rounded === 0n) throw new InputError('precision', 'Amount is too small to display at the available precision.');
  const integer = rounded / 10000n;
  const fraction = (rounded % 10000n).toString().padStart(4, '0').replace(/0+$/, '');
  return { value: fraction ? `${integer}.${fraction}` : `${integer}`, approximate: scaled % denominator !== 0n };
}

export function calculate(input, selectedPen = pen) {
  if (!selectedPen || !selectedPen.id) throw new Error('Unknown pen presentation');
  const [doseN, doseD] = parse(selectedPen.doseMg, 'mg');
  const [mgN, mgD] = parse(selectedPen.basis === 'total' ? selectedPen.totalMg : selectedPen.doseMg, 'mg');
  const [mlN, mlD] = parse(selectedPen.basis === 'total' ? selectedPen.totalMl : selectedPen.doseMl, 'ml');
  const ratioN = mgN * mlD, ratioD = mgD * mlN;
  const factors = { mg: [1n, 1n], ml: [ratioN, ratioD], fortieths: [ratioN, ratioD * 40n], clicks: selectedPen.assumedClicks ? [doseN, doseD * BigInt(selectedPen.assumedClicks)] : [0n, 1n] };
  let numerator = 0n, denominator = 1n, usesClicks = false;
  for (const field of fields) {
    const [value, scale] = parse(input[field], field);
    if (field === 'clicks' && value > 0n && !selectedPen.assumedClicks) throw new InputError('clickUnavailable', 'Click conversion is unavailable.', field);
    const [factorN, factorD] = factors[field];
    numerator = numerator * scale * factorD + value * factorN * denominator;
    denominator *= scale * factorD;
    if (field === 'clicks' && value > 0n) usesClicks = true;
  }
  if (numerator === 0n) throw new InputError('positive', 'Enter at least one positive amount.');
  if (numerator * doseD > doseN * denominator) {
    const error = new InputError('limit', 'The total exceeds one labelled dose.');
    error.doseMg = selectedPen.doseMg; error.doseMl = selectedPen.doseMl; throw error;
  }
  return { mg: format(numerator, denominator), ml: format(numerator * ratioD, denominator * ratioN), usesClicks };
}
