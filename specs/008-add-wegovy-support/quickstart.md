# Quickstart and Validation

## Prerequisites and launch

From repository root, use Node.js 22+, Ruby 3.3 and Bundler. Run `bundle install` if dependencies are not installed, then `npm test` and `bundle exec jekyll serve`; open the printed local address. Tests are local and do not depend on external services. Run `bundle exec jekyll serve --baseurl /penculator` to check the project-site path when appropriate.

## Acceptance checks

1. Run `npm test`; require all existing and new calculation, input, selection and language tests to pass.
2. Check each presentation listed in the feature spec, its identity and calculated labelled-dose equivalent. For 007, 5 mg Mounjaro gives 0.6 ml and two 0.5 mg / 3 ml Ozempic presentations yield 0.74 and 0.37 ml. For 008, the 0.5 mg Wegovy 1.5 ml and 3 ml pens yield 0.375 and 0.75 ml.
3. Exercise fractional and mixed inputs, both decimal separators, rounding, too-small, all-zero, invalid and over-limit inputs. Switch pens with an existing result and click input; verify unsupported clicks clear, controls disable, remaining inputs revalidate and no stale result survives.
4. Check relevant leaflet, warning, product context and all labels in English and Polish, on phone and desktop layouts without horizontal scrolling. Check original 15 mg Mounjaro behavior, and preserve all 007 presentations after implementing 008.
5. Record actual test and manual outcomes, including unavailable checks. For precise state and UI expectations see `data-model.md` and `contracts/ui.md`.

## Validation record (2026-11-14)

- Automated suite: `npm test` passed (21 tests). Baseline before changes: 17 tests passed. Presentation and switching tests are in `tests/pen-presentations.test.js` and `tests/pen-switch.test.js`.
- Jekyll preview did not run: the available Ruby 4 is incompatible with the pinned Jekyll/Liquid versions (`undefined method tainted?`); Ruby 3.3 was not found. The browser automation host was unavailable. Phone/desktop visual checks and the human usability target remain unverified.
