const mounjaroLeaflet = 'https://www.ema.europa.eu/en/documents/product-information/mounjaro-epar-product-information_en.pdf';
const ozempicLeaflet = 'https://www.ema.europa.eu/en/documents/product-information/ozempic-epar-product-information_en.pdf';
const wegovyLeaflet = 'https://www.ema.europa.eu/en/documents/product-information/wegovy-epar-product-information_en.pdf';
const make = (id, brand, device, ingredient, doseMg, totalMg, totalMl, doseMl, doses, leaflet, basis, assumedClicks = null) => Object.freeze({
  id, brand, device, ingredient, doseMg, totalMg, totalMl, doseMl, expectedDoseMl: doseMl, doses, leaflet, basis, assumedClicks,
  name: `${brand} ${doseMg} mg ${device} · ${totalMg} mg / ${totalMl} ml`
});
const mounjaro = [['25','2.5','10'],['5','5','20'],['75','7.5','30'],['10','10','40'],['125','12.5','50'],['15','15','60']].map(([id,dose,total]) => make(`mounjaro-${id}`, 'Mounjaro', 'KwikPen', 'tirzepatide', dose, total, '2.4', '0.6', 4, mounjaroLeaflet, 'dose', id === '15' ? 60 : null));
const ozempic = [
  ['025-2-15','0.25','2','1.5','0.19',4], ['05-2-15','0.5','2','1.5','0.37',4], ['05-2-3','0.5','2','3','0.74',4], ['05-4-3','0.5','4','3','0.37',8], ['1-4-3','1','4','3','0.74',4], ['1-8-3','1','8','3','0.37',8], ['2-8-3','2','8','3','0.74',4]
].map(([id,dose,total,volume,doseVolume,count]) => make(`ozempic-${id}`, 'Ozempic', 'pen', 'semaglutide', dose, total, volume, doseVolume, count, ozempicLeaflet, 'dose'));
const wegovy = [
  ['025-1-15','0.25','1','1.5','0.375'], ['05-2-15','0.5','2','1.5','0.375'], ['05-2-3','0.5','2','3','0.75'], ['1-4-3','1','4','3','0.75'], ['17-68-3','1.7','6.8','3','0.75'], ['24-96-3','2.4','9.6','3','0.75']
].map(([id,dose,total,volume,equivalent]) => make(`wegovy-${id}`, 'Wegovy', 'FlexTouch', 'semaglutide', dose, total, volume, equivalent, 4, wegovyLeaflet, 'total'));
export const pens = Object.freeze([...mounjaro, ...ozempic, ...wegovy]);
export const pen = pens.find(p => p.id === 'mounjaro-15');
export function getPen(id) {
  const found = pens.find(p => p.id === id);
  if (!found) throw new Error('Unknown pen presentation');
  return found;
}
