# Quickstart and Validation: Compact Calculator

These checks apply after implementation; they are not claims that the planned design already passes.

## Setup and automated regression checks

Use Node.js 22+, Ruby 3.3 and Bundler as documented in `README.md`. From the repository root:

```sh
bundle install
node --test
bundle exec jekyll serve
```

Open the printed local URL in a browser. Expect the complete existing calculation, validation and interaction suite to pass. Run any focused layout regression checks added during implementation and record results. If setup or a browser check cannot be run, record the exact limitation.

## Rendered browser checks

1. Set the actual browser content viewport to 768 × 768 CSS pixels at 100% zoom, scroll to the top, enter 1 mg, and verify all four labels, inputs, both controls each, the click warning and both result values and units fit without vertical scrolling. Repeat at 390 × 844. Include the site header in the measurement.
2. At 320 CSS pixels wide and at 200% text enlargement, inspect the page from top to bottom. Verify no horizontal page scrolling, clipped or overlapping text, controls or focus indicators; vertical scrolling is acceptable. Repeat with a long value and an invalid value.
3. Operate every increase and decrease control with keyboard and pointer, and verify touch activation on a touch device or touch-capable browser emulation. Confirm distinct names and visible focus, the target size/spacing contract, accurate live updates, and no unintended neighboring activation. Inspect accessible names and relationships using browser accessibility tools.
4. Enter malformed input after a valid result and verify the stale result disappears, the error is readable and correction restores the result. Enter clicks and confirm both the persistent click warning and conditional result warning are visible without expanding anything. Confirm the remaining product information, leaflet and disclaimer are accessible.
5. Check representative phone and desktop layouts for readability and use a first-time-user exercise as specified in SC-003: record participant count and the number completing entry, adjustment and identification of both results without help within 30 seconds. Do not infer this outcome from automated tests.
6. Repeat a calculation with `bundle exec jekyll serve --baseurl /penculator` at the corresponding project subpath to check asset loading and behavior.

Refer to [UI contract](contracts/ui.md) and [data model](data-model.md) for detailed expectations. Record browser versions, viewport measurements, input method, test outcomes and any checks not performed.

## Implementation check record — 2026-11-14

- `node --test`: 13 passed, 0 failed after the layout changes.
- Default local Jekyll startup failed: active Ruby 4.0.9 is incompatible with the locked Liquid version (`String#tainted?` is missing); the README specifies Ruby 3.3. A project-subpath build completed using a temporary Ruby 4 compatibility shim, but the site was not browser-verified.
- Browser-access host was unavailable in this session. Actual viewport fit, 320-pixel and enlarged-text reflow, focus and pointer/touch interactions, warning states, and project-subpath behavior remain unverified.
- No first-time participants were available; SC-003 is not verified.
