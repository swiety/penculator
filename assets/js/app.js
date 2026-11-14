import { calculate } from './calculator.js';
import { step } from './step.js';
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
function renderLanguage() {
  if (document.documentElement) document.documentElement.lang = language;
  if ('title' in document) document.title = `${translate(language, 'title')} | Penculator`;
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
}
selector?.addEventListener('change', () => {
  if (!['en', 'pl'].includes(selector.value)) return;
  language = selector.value;
  saveLanguage(storage, language);
  renderLanguage();
});
renderLanguage();
function update() {
  result.hidden = true;
  error.hidden = true;
  currentError = null;
  for (const name of fields) form.elements[name].removeAttribute('aria-invalid');
  if (fields.every(name => !form.elements[name].value.trim())) return;
  try {
    const input = Object.fromEntries(fields.map(name => [name, form.elements[name].value]));
    const total = calculate(input);
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
form.addEventListener('input', update);
form.addEventListener('submit', event => event.preventDefault());

for (const button of document.querySelectorAll('[data-field][data-direction]')) {
  button.addEventListener('click', () => {
    const field = button.dataset.field;
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
