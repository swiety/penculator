# Implementation Plan: Live Dose Controls

**Branch**: `main` | **Date**: 2026-11-13 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/004-live-dose-controls/spec.md`

## Summary

Replace explicit calculation with immediate updates as the four existing fields change. Add labelled increase/decrease controls using exact decimal steps while retaining the existing additive conversion, validation, limits, disclaimer and product context. Keep field adjustment arithmetic separate from DOM handling and verify both pure behavior and actual browser interaction.

## Technical Context

**Language/Version**: Existing plain browser JavaScript ES modules, HTML and CSS; BigInt for exact decimal arithmetic; Node.js 22 or later for local unit tests.

**Primary Dependencies**: Existing Jekyll/Minima static site and Node built-in test runner; no new runtime dependency.

**Storage**: None; field and result state remain in the page.

**Testing**: `node --test` for step and state behavior plus actual desktop/mobile browser checks for typing, paste, keyboard and pointer interaction, layout, and live feedback.

**Target Platform**: Modern desktop and mobile browsers; GitHub Pages static hosting.

**Project Type**: Existing static web application.

**Performance Goals**: Recalculate during each input update without submit or focus change; meet the specification's timed usability targets.

**Constraints**: Preserve decimal comma support, exact pre-rounding one-dose limit, existing product limitations and non-medical disclaimer; no added network service or stored personal data.

**Scale/Scope**: Four existing inputs, eight step controls and one live result.

## Constitution Check

**Pre-design: PASS.** The specification defines behavior, safety context, explicit increments and boundary cases. Exact adjustment and existing calculation logic remain separately testable; tests are required for meaningful changes.

**Post-design: PASS.** The model and UI contract define input and result states, exact steps, malformed-input recovery and limits. The design reuses the existing test runner and calculator and includes keyboard, pointer, touch and screen-reader checks. Existing manufacturer limitations remain visible. No exception is proposed.

## Project Structure

### Documentation (this feature)

```text
specs/004-live-dose-controls/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── contracts/ui.md
├── quickstart.md
└── tasks.md             # later $speckit-tasks output
```

### Source Code (repository root)

```text
index.html                # amount controls, feedback and result markup
assets/css/style.scss     # responsive step-control styling
assets/js/
├── app.js                # live event handling and result presentation
├── calculator.js         # existing calculation and validation logic
├── step.js               # pure exact field stepping, reusing shared parsing as appropriate
└── pen.js                # existing pen data
tests/                    # node:test calculation, step and interaction tests
README.md                 # usage changes if needed
```

**Structure Decision**: Retain the existing static site. Use a small pure stepping helper and a single live rendering path, reusing the calculator's validation and exact conversion rules. The existing `tests/app.test.js` assumes submission and must be updated to reflect automatic calculation.

## Complexity Tracking

No constitution violations or exceptions.
