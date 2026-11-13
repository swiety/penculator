---
description: "Implementation tasks for live dose updates and step controls"
---

# Tasks: Live Dose Controls

**Input**: `specs/004-live-dose-controls/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/ui.md`, and `quickstart.md`

**Tests**: Automated JavaScript tests follow the user's prior unit-test request and the project constitution. Real-browser checks cover the UI contract.

**Organization**: Story tasks are independently verifiable increments; `[P]` marks tasks that can run concurrently once their dependencies are satisfied and do not edit the same file.

## Phase 1: Setup

**Purpose**: Establish the existing application's baseline and testing environment.

- [X] T001 Run the existing Node test suite and record its baseline result in `specs/004-live-dose-controls/tasks.md`; confirm the Ruby/Jekyll preview prerequisites in `README.md`

## Phase 2: Foundational prerequisites

**Purpose**: Keep input interpretation and calculation behavior consistent across live updates and the step helper.

- [X] T002 Inspect and, if needed, extract shared exact numeric parsing from `assets/js/calculator.js` so calculation and stepping use the same rules: "Raw text: empty, valid non-negative numeric text, or invalid/incomplete text. Mg and ml allow decimal point or comma; counts allow only whole numbers."

**Checkpoint**: Existing conversion behavior is preserved and the shared input rules are available to both stories.

## Phase 3: User Story 1 — See totals as values change (P1)

**Goal**: Update the combined mg and ml result on every field edit without an explicit calculate action.

**Independent test**: Enter 1 mg, then 0.1 ml; without submitting or changing focus, the result changes from 1 mg / 0.04 ml to 3.5 mg / 0.14 ml. Clearing all fields removes both result and error.

### Tests

- [X] T003 [US1] Update `tests/app.test.js` to assert live recalculation on input and paste, current-result replacement, clearing all fields, no required submit or blur, and no accidental form navigation

### Implementation

- [X] T004 [P] [US1] Remove the calculate button in `index.html` while preserving the input labels, existing pen and product context, result region, disclaimer and accessible feedback
- [X] T005 [US1] Replace submit-only calculation in `assets/js/app.js` with a shared live update path that processes all current fields on input, prevents implicit form submission and preserves existing exact additive conversion and rounding
- [X] T006 [US1] Implement the state constraints in `assets/js/app.js`: "**Empty**: all fields are empty; no result or error." and "**Valid**: at least one positive value, no invalid values, within the existing exact limit and display precision; show current mg and ml with existing approximation and click-assumption context."
- [ ] T007 [US1] Verify the independent live-update scenarios against `specs/004-live-dose-controls/contracts/ui.md` and record actual results in `specs/004-live-dose-controls/tasks.md`

**Checkpoint**: US1 works independently with direct editing and retains the existing safety context.

## Phase 4: User Story 2 — Adjust values with controls (P1)

**Goal**: Provide accessible increase and decrease controls for all four fields, applying exact steps without changing other fields.

**Independent test**: Increase empty mg, ml, clicks and fortieths to 1, 0.1, 1 and 1 respectively; decrease each to zero and observe live total updates. Verify 0.15 ml goes to 0.25 and back.

### Tests

- [X] T008 [P] [US2] Add pure stepping tests in `tests/step.test.js` for all four increments/decrements, decimal commas, fractional offsets, repeated 0.1 ml steps, empty values, zero and clamp-to-zero behavior
- [X] T009 [P] [US2] Add interaction tests in `tests/step-controls.test.js` for all eight controls, untouched other fields, live result updates and non-submit behavior

### Implementation

- [X] T010 [US2] Implement exact adjustment in `assets/js/step.js` using the constraints "Step: 1 mg, 0.1 ml, 1 click, or 1 fortieth, respectively." and "Stepping changes only the selected field. Empty up becomes one step; empty down remains empty. Valid values increase or decrease by exactly the step without snapping; decrease clamps to zero."
- [X] T011 [P] [US2] Add individually focusable, non-submit increase/decrease buttons for every field in `index.html`, each with an accessible name specifying the direction and field
- [X] T012 [US2] Connect step controls to `assets/js/step.js` and the shared live update path in `assets/js/app.js`; preserve focus, leave other fields unchanged and recompute after programmatic value changes
- [X] T013 [US2] Style controls and focus states in `assets/css/style.scss` for pointer, touch and keyboard use without horizontal scrolling on phone and desktop
- [ ] T014 [US2] Verify every control, exact step and fractional offset using `specs/004-live-dose-controls/quickstart.md`; record actual desktop/mobile and keyboard results in `specs/004-live-dose-controls/tasks.md`

**Checkpoint**: US2 controls work with the US1 live result and are separately operable.

## Phase 5: User Story 3 — Recover from invalid values (P2)

**Goal**: Show corrective feedback without a stale result and recover automatically when values are fixed.

**Independent test**: Produce a valid result, enter malformed text and then a valid amount; verify the result disappears with a message and returns automatically after correction.

### Tests

- [X] T015 [P] [US3] Add state and recovery tests in `tests/live-validation.test.js` for zero-only, incomplete decimals, malformed and negative text, fractional counts, precision failures, exact limit and over-limit recovery
- [X] T016 [P] [US3] Extend `tests/step.test.js` to verify the constraint "Invalid, incomplete, negative, or fractional count text is preserved and yields corrective feedback." and that a step above the dose limit remains editable

### Implementation

- [X] T017 [US3] Implement invalid-state handling in `assets/js/app.js` using the constraint "**Invalid**: nonempty input is malformed, negative, zero-only, beyond the exact 15 mg / 0.6 ml limit, or below display precision; show no result and a corrective message."; clear feedback and restore the live result immediately on correction
- [X] T018 [US3] Ensure `assets/js/step.js` and `assets/js/app.js` preserve invalid raw field text on step attempts, leave over-limit stepped values visible, and allow the user to correct or step down to recover
- [ ] T019 [US3] Verify the UI feedback, existing click-assumption warning and recovery scenarios in `specs/004-live-dose-controls/contracts/ui.md`; record actual results in `specs/004-live-dose-controls/tasks.md`

**Checkpoint**: Invalid input never leaves a stale total and users can recover without submission.

## Final Phase: Polish and cross-cutting validation

- [X] T020 [P] Update usage instructions in `README.md` to describe live calculation and step controls while retaining the existing Ruby/Jekyll compatibility guidance
- [ ] T021 Run `node --test` and the desktop/mobile, keyboard, assistive-technology and `/penculator` checks from `specs/004-live-dose-controls/quickstart.md`; record actual outcomes and any unverified checks in `specs/004-live-dose-controls/tasks.md`
- [ ] T022 Review the complete feature against `specs/004-live-dose-controls/spec.md` and `.specify/memory/constitution.md`, including retained product warnings, existing conversion accuracy and no persisted personal data; record results in `specs/004-live-dose-controls/tasks.md`

## Dependencies and execution order

- T001 → T002 precedes story implementation. T003 is written before US1 implementation; T004 and T005 edit different files and may proceed in parallel after T003. T006 follows T005; T007 verifies the integrated story.
- US2 uses the US1 live rendering path. T008 and T009 can be authored in parallel after US1; T010 follows its tests, T011 can proceed independently in `index.html`, T012 follows T010 and T011, and T013 follows T011. T014 follows the integrated controls and styling.
- US3 builds on US1 and US2 state handling. T015 and T016 use separate test files and can be authored in parallel after US2; T017 and T018 both touch `assets/js/app.js`, so run them sequentially. T019 verifies recovery.
- T020 may proceed independently after the behavior is stable. T021 and T022 follow completed stories and both record results in the task file, so run them sequentially.

## Parallel examples by story

- **US1**: After T003, T004 modifies `index.html` while T005 modifies `assets/js/app.js`.
- **US2**: T008 and T009 create separate test files; after tests are written, T010 and T011 modify separate implementation files.
- **US3**: T015 and T016 write separate test files; their subsequent changes to shared implementation files remain sequential.

## Implementation strategy

Complete setup and foundation, then implement and independently verify US1 as the first usable increment. Add US2's controls and US3's recovery behavior before treating the feature as complete. Finish with the automated suite and real desktop/mobile browser and accessibility checks; report any checks that cannot be performed.

## Verification record

- Baseline: `node --test`, 8 tests passed. Existing README documents Ruby/Jekyll preview limitations.
- Live update, exact stepping and invalid-input recovery: `node --test`, 13 tests passed, including simulated-DOM interaction tests. Tests cover all four controls, empty and zero values, commas, fractional offsets, invalid values, over-limit recovery and stale-result removal.
- `RUBYOPT=-r/private/tmp/penculator-ruby4-compat.rb bundle exec jekyll build --baseurl /penculator` succeeded with the existing Ruby 4 shim. Generated HTML includes all eight labelled controls and base-path-prefixed assets; no calculate button is present.
- Real desktop/mobile browser, keyboard, touch and assistive-technology checks could not run: the browser control host reported unavailable. T007, T014, T019, T021 and T022 remain open pending those checks and final review. Simulated DOM tests do not verify actual browser accessibility or layout.
