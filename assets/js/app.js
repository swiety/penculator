import { calculate } from './calculator.js';
import { step } from './step.js';

const form = document.querySelector('#dose-form');
const result = document.querySelector('#result');
const error = document.querySelector('#error');
const fields = ['mg', 'ml', 'clicks', 'fortieths'];
function update() {
  result.hidden = true;
  error.hidden = true;
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
    error.textContent = problem.message;
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
      error.textContent = problem.message;
      error.hidden = false;
    }
  });
}
