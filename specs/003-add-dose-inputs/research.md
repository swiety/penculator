# Research: Add Dose Inputs

## Static site, theme and deployment

**Decision**: Use GitHub Pages-compatible Jekyll with Minima, a small stylesheet override, and static assets. Use `relative_url` for internal asset links and validate a build with a nonempty base path. Configure GitHub Pages to publish a built site through a supported source; document the selected repository configuration during implementation.

**Rationale**: GitHub supports Jekyll themes on Pages, and Jekyll's `relative_url` handles a configured base path. Check the installed theme version rather than assuming the latest upstream development documentation describes it. Sources: [GitHub Pages themes](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll), [Jekyll URL filters](https://jekyllrb.com/docs/liquid/filters/), [Jekyll options](https://jekyllrb.com/docs/configuration/options/).

**Alternatives considered**: A custom theme or client framework adds complexity for one screen; a backend is unnecessary.

## Test approach

**Decision**: Use plain JavaScript ES modules, `node:test`, and `node:assert/strict`, with `node --test`. Supplement unit tests with browser checks for layout, DOM behavior and URLs.

**Rationale**: Node's [built-in test runner](https://nodejs.org/api/test.html) needs no additional test framework. DOM and actual hosting behavior require browser verification.

**Alternatives considered**: A third-party test framework is unnecessary for this scope; manual calculation checks alone are not repeatable enough.

## Arithmetic and input

**Decision**: Parse user decimal strings as exact decimal rationals, add converted amounts before rounding, compare exact totals to limits, and round output to four decimal places using ties away from zero. Use integer/BigInt rational arithmetic in the pure calculation module; avoid binary floating-point comparisons for clinical-unit boundaries. Preserve whether each output was rounded and reject values that display as zero in either unit.

**Rationale**: Decimal fractions and conversion ratios must not produce off-by-one results at the 15 mg limit or rounding ties. The specification explicitly requires summation before rounding and approximation labels.

**Alternatives considered**: Native floating-point arithmetic can be inaccurate at boundaries; an external decimal library adds a dependency for simple ratios.

## Multiple fields and product assumption

**Decision**: Add the amounts represented by all populated inputs. Apply the user's 60-click assumption only as mathematical input conversion and show its unverified status alongside the manufacturer warning.

**Rationale**: This reflects the user's clarification and the specification. [Lilly](https://medical.lilly.com/es/products/answers/se-deben-contar-los-clics-al-marcar-una-dosis-de-mounjaro-tirzepatida-kwikpen-315965) advises against using click counts to select a dose.

**Alternatives considered**: Treating inputs as alternative representations contradicts the clarified requirement; presenting click arithmetic as device guidance contradicts the constitution and product instructions.
