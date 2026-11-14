import { getPen } from './pen.js';

export function defaultSettings(pen) {
  return { pen: pen.id, target: pen.doseMg };
}

export function parseTarget(raw) {
  const text = String(raw ?? '').trim();
  if (!/^\d+(?:[.,]\d+)?$/.test(text)) throw new Error('targetInvalid');
  let [whole, fraction = ''] = text.replace(',', '.').split('.');
  whole = whole.replace(/^0+(?=\d)/, '');
  fraction = fraction.replace(/0+$/, '');
  if (BigInt(whole) === 0n && !fraction) throw new Error('targetInvalid');
  return fraction ? `${whole}.${fraction}` : whole;
}

export function stepTarget(raw, direction) {
  if (direction !== 1 && direction !== -1) throw new Error('targetInvalid');
  const [whole, fraction = ''] = parseTarget(raw).split('.');
  const scale = 10n ** BigInt(fraction.length);
  const value = BigInt(whole) * scale + BigInt(fraction || '0') + BigInt(direction) * scale;
  if (value <= 0n) throw new Error('targetBoundary');
  const integer = value / scale;
  const remainder = (value % scale).toString().padStart(fraction.length, '0');
  return parseTarget(fraction ? `${integer}.${remainder}` : String(integer));
}

export function settingsLink(page, penId, target) {
  getPen(penId);
  const url = new URL(page);
  url.hash = `settings?pen=${encodeURIComponent(penId)}&target=${encodeURIComponent(parseTarget(target))}`;
  return url.href;
}

export function readSettings(hash) {
  if (hash !== '#settings' && !hash.startsWith('#settings?')) return { status: 'unrelated' };
  try {
    if (hash === '#settings') throw new Error('missing');
    const parts = hash.slice('#settings?'.length).split('&');
    if (parts.length !== 2) throw new Error('parameters');
    const values = Object.create(null);
    for (const part of parts) {
      const pair = part.split('=');
      if (pair.length !== 2) throw new Error('parameters');
      const key = decodeURIComponent(pair[0].replace(/\+/g, ' '));
      const value = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      if (!['pen', 'target'].includes(key) || Object.hasOwn(values, key)) throw new Error('parameters');
      values[key] = value;
    }
    if (!Object.hasOwn(values, 'pen') || !Object.hasOwn(values, 'target')) throw new Error('missing');
    getPen(values.pen);
    return { status: 'valid', pen: values.pen, target: parseTarget(values.target) };
  } catch { return { status: 'invalid' }; }
}
