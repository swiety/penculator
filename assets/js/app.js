import { calculate } from './calculator.js';
import { pens, pen, getPen } from './pen.js';
import { step } from './step.js';
import { defaultSettings, parseTarget, stepTarget, settingsLink, readSettings } from './target-settings.js';
import { initialLanguage, saveLanguage, translate, errorMessage } from './i18n.js';

const form = document.querySelector('#dose-form');
const result = document.querySelector('#result');
const error = document.querySelector('#error');
const fields = ['mg', 'ml', 'clicks', 'fortieths'];
let storage;
try { storage = globalThis.localStorage; } catch {}
const browser = globalThis.navigator;
let language = initialLanguage(storage, browser?.languages, browser?.language);
let currentError = null;
const selector = document.querySelector('#language');
const penSelector = document.querySelector('#pen');
let selectedPen = pen;
const targetInput = document.querySelector('#target-dose');
const targetError = document.querySelector('#target-error');
const linkError = document.querySelector('#link-error');
const settingsAnchor = document.querySelector('#settings-link');
const shareInstruction = document.querySelector('#share-instruction');
let targetProblem = null;
let linkProblem = false;
const pageLocation = globalThis.location;
const initialSettings = pageLocation ? readSettings(pageLocation.hash) : { status: 'unrelated' };
if (initialSettings.status === 'valid') selectedPen = getPen(initialSettings.pen);
if (initialSettings.status === 'invalid') linkProblem = true;
if (targetInput) targetInput.value = initialSettings.status === 'valid' ? initialSettings.target : defaultSettings(selectedPen).target;
function renderTarget() {
  if (!targetInput) return;
  if (targetError) { targetError.hidden = !targetProblem; targetError.textContent = targetProblem ? translate(language, targetProblem) : ''; }
  if (linkError) { linkError.hidden = !linkProblem; linkError.textContent = linkProblem ? translate(language, 'linkInvalid') : ''; }
  try {
    const target = parseTarget(targetInput.value);
    if (settingsAnchor && pageLocation) {
      const href = settingsLink(pageLocation.href, selectedPen.id, target);
      settingsAnchor.href = href; settingsAnchor.hidden = false;
      if (shareInstruction) shareInstruction.hidden = false;
    }
  } catch {
    if (shareInstruction) shareInstruction.hidden = true;
    if (settingsAnchor) { settingsAnchor.hidden = true; settingsAnchor.removeAttribute('href'); }
  }
}
function validateTarget() {
  try { parseTarget(targetInput.value); targetProblem = null; }
  catch { targetProblem = 'targetInvalid'; }
  renderTarget();
}
targetInput?.addEventListener('input', validateTarget);
for (const button of document.querySelectorAll('[data-target-direction]')) {
  button.addEventListener('click', () => {
    try { targetInput.value = stepTarget(targetInput.value, Number(button.dataset.targetDirection)); targetProblem = null; }
    catch (problem) { targetProblem = problem.message; }
    renderTarget();
  });
}
globalThis.addEventListener?.('hashchange', () => {
  const restored = readSettings(pageLocation.hash);
  if (restored.status === 'unrelated') return;
  const oldPen = selectedPen;
  if (restored.status === 'invalid') { selectedPen = pen; linkProblem = true; targetInput.value = defaultSettings(pen).target; }
  else { selectedPen = getPen(restored.pen); targetInput.value = restored.target; linkProblem = false; }
  targetProblem = null;
  if (penSelector) penSelector.value = selectedPen.id;
  renderPen(); renderTarget();
  if (oldPen?.id !== selectedPen.id) update();
});
if (penSelector && document.createElement) {
  penSelector.textContent = '';
  for (const p of pens) {
    const option = document.createElement('option');
    option.value = p.id; option.textContent = p.name; penSelector.append(option);
  }
  penSelector.value = selectedPen.id;
}
function renderPen() {
  if (!selectedPen) return;
  const details = document.querySelector('#pen-details');
  const context = document.querySelector('#product-context');
  const leaflet = document.querySelector('#leaflet');
  const warning = document.querySelector('#click-warning');
  const pl = language === 'pl';
  const n = value => pl ? String(value).replace('.', ',') : value;
  if (details) details.textContent = `${selectedPen.brand} ${selectedPen.device} · ${pl && selectedPen.ingredient === 'tirzepatide' ? 'tyrzepatyd' : selectedPen.ingredient} · ${selectedPen.doses} ${pl ? 'dawki' : 'doses'} · ${n(selectedPen.doseMg)} mg / ${n(selectedPen.doseMl)} ml ${selectedPen.basis === 'total' ? (pl ? '(równowartość obliczona z zawartości)' : '(equivalent calculated from total contents)') : (pl ? 'na dawkę' : 'per dose')} · ${n(selectedPen.totalMg)} mg / ${n(selectedPen.totalMl)} ml`;
  if (context) context.textContent = selectedPen.brand === 'Mounjaro' ? (pl ? 'Po czterech dawkach nie używaj pozostałego leku. Sprawdź informacje dołączone do własnego produktu i przeczytaj ' : 'After four doses, do not use remaining medicine. Check the information supplied with your product and read the ') : selectedPen.brand === 'Wegovy' ? (pl ? 'Po czterech dawkach pozostała ilość nie wystarcza na kolejną dawkę. Sprawdź informacje dołączone do własnego produktu i przeczytaj ' : 'After four doses, any remaining solution is insufficient for another dose. Check the information supplied with your product and read the ') : (pl ? 'Sprawdź informacje dołączone do własnego produktu i przeczytaj ' : 'Check the information supplied with your product and read the ');
  if (leaflet) leaflet.href = selectedPen.leaflet;
  if (warning) warning.textContent = selectedPen.assumedClicks ? translate(language, 'warning') : (pl ? 'Przeliczanie kliknięć dla tego pena jest niedostępne. Producent odradza liczenie kliknięć w celu wybrania dawki.' : 'Click conversion is unavailable for this pen. The manufacturer advises against counting clicks to select a dose.');
  if (form.elements.clicks) form.elements.clicks.disabled = !selectedPen.assumedClicks;
  for (const button of document.querySelectorAll('[data-field][data-direction]')) if (button.dataset.field === 'clicks') button.disabled = !selectedPen.assumedClicks;
}
penSelector?.addEventListener('change', () => {
  try { selectedPen = getPen(penSelector.value); }
  catch { selectedPen = null; result.hidden = true; error.hidden = false; error.textContent = 'Unknown pen presentation'; return; }
  if (!selectedPen.assumedClicks) form.elements.clicks.value = '';
  if (targetInput) { targetInput.value = defaultSettings(selectedPen).target; targetProblem = null; linkProblem = false; renderTarget(); }
  renderPen(); update();
});
function renderLanguage() {
  if (document.documentElement) document.documentElement.lang = language;
  if ('title' in document) document.title = `${translate(language, 'title')} | Penculator`;
  for (const element of document.querySelectorAll('[data-i18n-aria]')) { if (element.dataset.i18nAria) element.setAttribute('aria-label', translate(language, element.dataset.i18nAria)); }
  for (const element of document.querySelectorAll('[data-i18n]')) {
    if (element.dataset.i18n) element.textContent = translate(language, element.dataset.i18n);
  }
  for (const button of document.querySelectorAll('[data-field][data-direction]')) {
    const direction = button.dataset.direction === '1' ? 'increase' : 'decrease';
    const names = { en: { mg: 'mg', ml: 'ml', clicks: 'clicks', fortieths: 'fortieths' }, pl: { mg: 'mg', ml: 'ml', clicks: 'liczbę kliknięć', fortieths: 'liczbę czterdziestych części' } };
    button.setAttribute?.('aria-label', `${translate(language, direction)} ${names[language][button.dataset.field]}`);
  }
  const context = document.querySelector('.context');
  context?.setAttribute?.('aria-label', translate(language, 'important'));
  if (selector) selector.value = language;
  if (currentError) error.textContent = errorMessage(language, currentError);
  renderPen();
  renderTarget();
}
selector?.addEventListener('change', () => {
  if (!['en', 'pl'].includes(selector.value)) return;
  language = selector.value;
  saveLanguage(storage, language);
  renderLanguage();
});
renderLanguage();
function update() {
  if (!selectedPen) { result.hidden = true; error.hidden = false; error.textContent = 'Unknown pen presentation'; return; }
  result.hidden = true;
  error.hidden = true;
  currentError = null;
  for (const name of fields) form.elements[name].removeAttribute('aria-invalid');
  if (fields.every(name => !form.elements[name].value.trim())) return;
  try {
    const input = Object.fromEntries(fields.map(name => [name, form.elements[name].value]));
    const total = calculate(input, selectedPen);
    for (const [unit, value] of [['mg', total.mg], ['ml', total.ml]]) {
      document.querySelector(`#result-${unit}`).textContent = `${value.approximate ? '≈ ' : ''}${value.value} ${unit}`;
    }
    document.querySelector('#result-click-warning').hidden = !total.usesClicks;
    result.hidden = false;
  } catch (problem) {
    currentError = problem;
    error.textContent = errorMessage(language, problem);
    error.hidden = false;
  }
}
form.addEventListener('input', event => { if (targetInput && event?.target === targetInput) return; update(); });
form.addEventListener('submit', event => event.preventDefault());

for (const button of document.querySelectorAll('[data-field][data-direction]')) {
  button.addEventListener('click', () => {
    const field = button.dataset.field;
    if (button.disabled) return;
    try {
      form.elements[field].value = step(form.elements[field].value, field, Number(button.dataset.direction));
      update();
    } catch (problem) {
      result.hidden = true;
      currentError = problem;
    error.textContent = errorMessage(language, problem);
      error.hidden = false;
    }
  });
}
