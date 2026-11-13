---
description: "Implementation tasks for the static pen-dose calculator"
---

# Tasks: Add Dose Inputs

**Input**: `specs/003-add-dose-inputs/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/ui.md`, and `quickstart.md`

**Tests**: Plain JavaScript unit tests were explicitly requested. Browser checks validate the UI contract.

**Organization**: Tasks are grouped by user story. `[P]` marks tasks that can run concurrently after their dependencies are satisfied and do not edit the same files.

## Phase 1: Setup

**Purpose**: Configure a static Jekyll site and a local JavaScript test environment.

- [X] T001 Configure the GitHub Pages-compatible Jekyll dependency in `Gemfile` and Minima theme, site metadata, and appropriate asset exclusions in `_config.yml`
- [X] T002 [P] Configure ES modules and a `node --test` script in `package.json`, requiring Node.js 22 or later for development

## Phase 2: Foundational prerequisites

**Purpose**: Establish the shared static page and supported pen specification before user stories.

- [X] T003 Create the Jekyll page shell, semantic main and footer regions, and base-path-safe stylesheet and module links in `index.html`
- [X] T004 [P] Define the supported pen data in `assets/js/pen.js`: "Identity: Mounjaro 15 mg KwikPen, the sole selectable type.", "Labelled dose: 15 mg in 0.6 ml; four fixed doses.", and "Mathematical click assumption: 60 clicks per labelled dose; unverified for device dosing."

**Checkpoint**: Jekyll page shell, test setup and pen constants are ready.

## Phase 3: User Story 1 — Calculate from a chosen input (P1)

**Goal**: Select the 15 mg pen, enter an amount in any one of the four fields, and see its mathematical equivalent in mg and ml with the required context.

**Independent test**: Individually enter 15 mg, 0.6 ml, 60 clicks and 24 units of 1/40 ml; each produces 15 mg and 0.6 ml. Check click context and that an edit clears or updates the result.

### Tests

- [X] T005 [P] [US1] Write single-field conversion tests in `tests/calculator.test.js` for all four full-dose examples, fractional values, comma decimals and independently calculated expected amounts
- [X] T006 [P] [US1] Write validation and rounding tests in `tests/validation.test.js` for malformed and negative inputs, empty and zero-only entries, count fractions, exact and over-limit inputs, four-place ties, approximation labels and positive values rounding to zero

### Implementation

- [X] T007 [US1] Implement pure exact decimal parsing and validation in `assets/js/calculator.js` using the model constraints: "`mg` and `ml`: optional non-negative decimal strings, accepting a decimal point or comma.", "`clicks` and `fortieths`: optional non-negative integer strings; each fortieth is 1/40 ml.", and "At least one supplied value must be positive. Empty fields contribute zero; a zero field can accompany a positive field. Reject malformed input or any negative value even when another field is valid."
- [X] T008 [US1] Implement exact single-input conversions and output formatting in `assets/js/calculator.js`, including "Displayed mg and ml: at most four fractional digits, rounded to nearest with ties away from zero. Mark a displayed value approximate when rounding changed it; reject any positive amount whose displayed mg or ml would be zero." and "Reject exact totals above 15 mg or 0.6 ml."
- [X] T009 [US1] Add the pen selector, four labelled fields, calculate action, accessible error and result areas, and essential product/click limitations in `index.html`, referencing the UI contract
- [X] T010 [US1] Connect inputs to the pure calculator in `assets/js/app.js`, show both units and approximation indicators, explain validation errors, identify click-based results as unverified, and clear or update stale results on edits
- [ ] T011 [US1] Verify the single-field UI contract and keyboard interaction against `specs/003-add-dose-inputs/contracts/ui.md` and record actual results in `specs/003-add-dose-inputs/tasks.md`

**Checkpoint**: US1 works with one populated field and includes the required safety context. Do not describe the MVP as supporting multiple inputs until US2 is complete.

## Phase 4: User Story 2 — Enter multiple values (P1)

**Goal**: Add the amounts represented by populated fields before rounding and enforce the limit on the combined exact amount.

**Independent test**: Enter 1 mg and 0.1 ml to obtain 3.5 mg and 0.14 ml; enter 10 mg and 0.3 ml and verify an over-limit message without a result.

### Tests

- [X] T012 [P] [US2] Add additive calculation tests in `tests/addition.test.js` for the two acceptance examples, all four fields, a mixed valid/invalid entry, a zero plus a positive value, and a sum whose rounded display would conceal an exact over-limit total
- [X] T013 [P] [US2] Add sum-before-rounding tests in `tests/addition-rounding.test.js` using independently derived results, ties, and approximation flags for both displayed units

### Implementation

- [X] T014 [US2] Extend `assets/js/calculator.js` so it follows the constraint "Treat every populated input as a separate amount; add all equivalents before rounding. Reject exact totals above 15 mg or 0.6 ml." and prevents an invalid field from producing a partial result
- [X] T015 [US2] Update `assets/js/app.js` to submit all populated fields together, show combined results and errors, and retain click-based context when a nonzero click value contributes
- [ ] T016 [US2] Verify combined-input examples and invalid-field recovery against `specs/003-add-dose-inputs/contracts/ui.md` and record actual results in `specs/003-add-dose-inputs/tasks.md`

**Checkpoint**: US2 works with any supported combination and US1 remains correct.

## Phase 5: User Story 3 — Understand calculation limits (P2)

**Goal**: Make the product information, disclaimer and limitations easy to find on phone and desktop.

**Independent test**: On phone and desktop, locate the bottom-of-page disclaimer, manufacturer click warning, four-dose context and patient leaflet; verify no horizontal scrolling.

### Implementation and verification

- [X] T017 [US3] Complete the bottom-of-page non-medical disclaimer, four-dose and residual-medicine information, manufacturer leaflet link, and unverified-click warning in `index.html` as specified in `specs/003-add-dose-inputs/contracts/ui.md`
- [X] T018 [US3] Customize Minima in `assets/css/style.scss` so controls, errors, product context and disclaimer remain readable without horizontal scrolling on phone and desktop
- [ ] T019 [US3] Verify visible disclaimer, click limitation, linked leaflet, accessible labels and keyboard navigation on phone and desktop against `specs/003-add-dose-inputs/contracts/ui.md`, recording actual results in `specs/003-add-dose-inputs/tasks.md`

**Checkpoint**: Product limitations and disclaimer are visible and usable across viewport sizes.

## Final Phase: Documentation and validation

- [X] T020 [P] Document prerequisites, `bundle install`, `node --test`, local preview, project base-path preview and GitHub Pages publishing configuration in `README.md`
- [ ] T021 Run all unit tests and the root and `/penculator` browser checks in `specs/003-add-dose-inputs/quickstart.md`; record results and any unrun checks in `specs/003-add-dose-inputs/tasks.md`
- [ ] T022 Review the built site against the specification and constitution, including no runtime calculation service or personal-information storage, and record results in `specs/003-add-dose-inputs/tasks.md`

## Dependencies and execution order

- T001 and T002 can proceed in parallel. T003 depends on T001; T004 depends on neither setup file. Complete the foundation before story implementation.
- US1 tests T005 and T006 may be authored in parallel; T007 and T008 implement the behavior they cover. T009 can proceed after T003 independently of those tests; T010 depends on T008 and T009, then T011 verifies the integrated flow.
- US2 builds on US1's calculator and page. T012 and T013 can be authored in parallel after US1; T014 follows them, T015 follows T014, and T016 verifies the integrated flow.
- US3's T017 edits the same page as T009, so run it after T009; T018 follows T017 and T019 verifies both. The essential limitations in T009 are present already at the US1 checkpoint.
- T020 can be written in parallel with story work once setup choices are known. T021 and T022 follow all required story work; each records results in the same file, so run them sequentially.

## Parallel examples by story

- **US1**: Write T005 and T006 in separate test files concurrently; T009 can be prepared independently once the shell exists.
- **US2**: Write T012 and T013 in separate test files concurrently after the shared calculation interface exists.
- **US3**: After T009, implement T017 in `index.html` while independent US2 test authoring in T012/T013 proceeds; do not edit the same file concurrently.

## Implementation strategy

Complete setup and foundation, then deliver US1 with its necessary safety context as the first independently verifiable increment. Add US2's additive behavior and complete US3's full presentation before treating the application as feature-complete. Finish with documentation, automated unit tests, and desktop, mobile and base-path browser checks. Publishing is a separate action and is not performed by this checklist.

## Verification record (2026-11-13)

- `node --test`: 8 tests passed, including the form handlers with a simulated DOM.
- Jekyll root and `/penculator` builds succeeded on Ruby 4 only with a temporary compatibility shim for removed taint methods. The generated project build contained base-path-prefixed CSS and JavaScript links and both assets existed. Standard Ruby 4 preview remains incompatible with the GitHub Pages Liquid version; Ruby 3.3 is documented for local use but was not available to verify here.
- Desktop/mobile visual, real-browser keyboard and live base-path checks remain unverified: browser control was unavailable, and the Zen app control attempt timed out. T011, T016, T019, T021 and T022 remain open.
