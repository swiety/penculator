import { calculate } from './calculator.js';

const form = document.querySelector('#dose-form');
const result = document.querySelector('#result');
const error = document.querySelector('#error');
const fields = ['mg', 'ml', 'clicks', 'fortieths'];
form.addEventListener('input', () => {
  result.hidden = true;
  error.hidden = true;
  for (const name of fields) form.elements[name].removeAttribute('aria-invalid');
});
form.addEventListener('submit', event => {
  event.preventDefault();
  result.hidden = true;
  error.hidden = true;
  try {
    const input = Object.fromEntries(fields.map(name => [name, form.elements[name].value]));
    const total = calculate(input);
    for (const [unit, value] of [['mg', total.mg], ['ml', total.ml]]) {
      document.querySelector(`#result-${unit}`).textContent = `${value.approximate ? '≈ ' : ''}${value.value} ${unit}`;
    }
    document.querySelector('#result-click-warning').hidden = !total.usesClicks;
    result.hidden = false;
  } catch (problem) {
    error.textContent = problem.message;
    error.hidden = false;
  }
});
