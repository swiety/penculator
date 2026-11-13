# Tasks: Multiple Dose Inputs

**Input**: `specs/002-multiple-dose-inputs/spec.md`, `plan.md`, and `research.md`

**Status: DRAFT — NOT READY FOR IMPLEMENTATION.** FR-004 is unresolved and the plan's constitution gate is blocked. The data model, interface contract, quickstart and final plan have not been completed. This preliminary list captures work that can be identified now; it must be revised after the specification and plan are finalized.

## Phase 1: Resolve prerequisites

- [ ] T001 Resolve whether multiple populated fields are added or represent the same amount and record acceptance examples in `specs/002-multiple-dose-inputs/spec.md`
- [ ] T002 Complete the design and constitution checks in `specs/002-multiple-dose-inputs/plan.md` and produce its data model, interface contract and quickstart in `specs/002-multiple-dose-inputs/`
- [ ] T003 Revise this task list and its acceptance criteria against the completed design in `specs/002-multiple-dose-inputs/tasks.md`

## Phase 2: Setup and foundation

- [ ] T004 Configure the Minima Jekyll theme and project-site base path in `_config.yml`
- [ ] T005 [P] Configure JavaScript module and built-in Node test execution in `package.json`
- [ ] T006 Define the supported 15 mg pen and conversion constants separately from presentation in `assets/js/calculator.js`

## Phase 3: User Story 1 — Calculate from a chosen input (P1)

**Goal**: Select the supported pen and calculate mg and ml from any one field.

**Independent test**: Each of 15 mg, 0.6 ml, 60 clicks and 24 units of 1/40 ml produces 15 mg and 0.6 ml, with the specified context visible.

- [ ] T007 [P] [US1] Add unit tests for single-field conversion, numeric validation, rounding and one-dose limits in `tests/calculator.test.js`
- [ ] T008 [US1] Implement validated single-field conversion and explicit rounding in `assets/js/calculator.js`
- [ ] T009 [P] [US1] Add the pen selector, four labelled inputs, result and validation message areas in `index.html`
- [ ] T010 [US1] Connect the form to the calculation and clear or update stale results in `assets/js/app.js`

## Phase 4: User Story 2 — Enter multiple values (P1)

**Goal**: Calculate consistently when multiple fields are populated.

**Independent test**: Pending the decision in T001; add a concrete example before this list is finalized.

- [ ] T011 [US2] Add tests for the accepted multiple-field examples and boundary cases defined by T001 in `tests/calculator.test.js`
- [ ] T012 [US2] Implement the approved multiple-field behavior and its validation from the finalized specification in `assets/js/calculator.js`
- [ ] T013 [US2] Present errors and results for multiple populated fields according to the finalized interface contract in `assets/js/app.js`

## Phase 5: User Story 3 — Understand calculation limits (P2)

**Goal**: Display the disclaimer, product information and calculation limitations.

**Independent test**: On phone and desktop, locate the bottom-of-screen disclaimer, click limitation, fixed-dose context and patient leaflet.

- [ ] T014 [P] [US3] Add the requested disclaimer, click limitation, product context and leaflet link in `index.html`
- [ ] T015 [US3] Style the calculator and limitation text for phone and desktop without horizontal scrolling in `assets/css/style.scss`

## Final Phase: Validation and documentation

- [ ] T016 Document local setup, unit tests, local Jekyll preview and GitHub Pages publication in `README.md`
- [ ] T017 Run the unit tests and the finalized browser and base-path checks from `specs/002-multiple-dose-inputs/quickstart.md` and record outcomes in `specs/002-multiple-dose-inputs/tasks.md`

## Dependencies and execution order

T001 → T002 → T003 is a mandatory gate before implementation. Setup and foundation precede the stories. US2 builds on the calculation and form introduced in US1; US3 can be developed independently after setup, but T014 and T009 both edit `index.html` and must not run concurrently. Final validation follows all stories.

## Parallel opportunities

- US1: T007 and T009 use different files and can proceed in parallel after the prerequisite gate; T008 follows T007, and T010 follows T008 and T009.
- US2: Its tests, calculation and integration are sequential because each depends on the approved behavior and prior work.
- US3: T014 may proceed independently of calculation tests in `tests/calculator.test.js`; T015 follows the page content it styles.

## Implementation strategy

After the specification and plan are complete, implement and verify US1 first as an MVP, then complete US2 and US3 and validate the complete static site. The MVP must retain the applicable medical-context requirements; it must not be presented as a finished release while those are missing.
