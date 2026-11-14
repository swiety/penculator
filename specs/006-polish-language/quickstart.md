# Quickstart and Validation: Polish Language Support

These are acceptance checks to perform after implementation, not claims of current behavior.

## Setup and automated checks

Use Node.js 22+, Ruby 3.3 and Bundler per `README.md`. From the repository root:

```sh
bundle install
node --test
bundle exec jekyll serve
```

Expect existing calculation and stepping suites and new language-selection, catalog-completeness, storage-failure, error-localization and state-preservation tests to pass. Record exact failures or setup limitations. The previously attempted feature 005 browser checks were not completed; do not treat them as inherited passes.

## Browser acceptance checks

1. In fresh browser storage, simulate ordered preferences `pl-PL,en`, `fr,pl,en`, `en-GB,pl`, unsupported-only, and empty/unavailable; verify selection as specified in [UI contract](contracts/ui.md). Check case variants and invalid stored values.
2. Switch languages, reload, and check that the explicit selection wins over different browser preferences. Disable or block storage and verify switching still works until the page is reloaded, with no calculator failure.
3. Inventory all visible, state-dependent and accessible strings in each language: header, document title, selector, input labels, both controls per field, hints, pen information, results, errors, both click warnings, leaflet, disclaimer and product limitations. Check translation equivalence and Polish wording with a competent Polish reviewer; identify the English leaflet when Polish is selected.
4. Switch while empty, after entering a valid multi-field result, while editing an incomplete decimal, and after a step-generated error. Verify exact input text, selected pen, focus, validity, results and warnings remain correct; text changes language immediately and stale results never appear. Verify comma and point input, stepping, limits, rounding and error recovery in both languages.
5. Using the actual rendered page including theme header, test both languages at 768 × 768 and 390 × 844 CSS pixels at 100% zoom with 1 mg and no errors; verify all specified fields, controls, click warning and results are visible at the top. Check width 320 and 200% text enlargement, long text and errors for reflow and reachability. Test selector and all step controls with keyboard, pointer and touch-capable input, including accessible names and focus.
6. Conduct the first-time-user exercise in SC-004; record participant count, completions and elapsed times. If participants are unavailable, record that the outcome remains unverified.
7. Serve with `bundle exec jekyll serve --baseurl /penculator` and repeat selection and calculation at the project subpath. Record browser versions, input methods, viewport sizes, results and any checks not performed.

## Implementation check record — 2026-11-14

- `node --test`: 17 tests passed, including preference ordering, malformed and unsupported tags, unavailable storage, matching catalog keys, translated errors, and switching with an existing result and step error in a simulated document.
- Jekyll project-subpath build succeeded with a temporary Ruby 4 compatibility shim; the standard documented Ruby 3.3 was unavailable. This does not establish browser behavior at the subpath.
- Browser access host was unavailable, so rendered viewport fit, actual keyboard, pointer and touch behavior, accessibility inspection, and browser preference/storage scenarios remain unverified. Feature 005 layout verification also remains outstanding.
- No independent Polish reviewer or first-time usability participants were available; translation review and SC-004 remain unverified.
