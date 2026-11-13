# Quickstart and Validation: Live Dose Controls

These are validation steps for the planned feature after implementation. Follow the repository README for Ruby/Jekyll prerequisites; the current GitHub Pages Liquid version requires a Ruby 4 compatibility workaround, and prior real-browser checks were not completed.

## Automated tests

From the repository root:

```sh
node --test
```

Expect the existing conversion suite and new stepping/live-interaction tests to pass. Tests should cover each unit's up/down step, empty and zero values, fractional offsets, comma decimals, invalid and incomplete text, combined sums, exact limit, over-limit recovery, precision failures and stale result removal. See [data-model.md](data-model.md).

## Browser checks

Start the site following `README.md` and open the local URL. On desktop and a phone-sized viewport:

1. Type 1 mg and paste 0.1 ml; without submitting or leaving either field, observe 3.5 mg and 0.14 ml. Clear the fields and confirm no result or error.
2. Check each up/down control: empty up then down; 2.5 mg up/down; 0.15 ml up/down; count fields by one; zero and values below a step. Use keyboard as well as pointer/touch.
3. Enter malformed input and values exceeding the dose limit; confirm the prior result is hidden and an explanation appears. Correct the input and confirm immediate recovery; test that stepping invalid text does not overwrite it.
4. Confirm control names, focus order, live feedback, click-assumption warning, leaflet and disclaimer. Verify no horizontal scrolling and no calculation button.
5. Serve with `--baseurl /penculator` and repeat a calculation at the project subpath to verify assets and behavior.

Record actual test and browser results; do not infer screen-reader or mobile behavior from unit tests. See [UI contract](contracts/ui.md).
