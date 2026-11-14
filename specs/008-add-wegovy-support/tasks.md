# Tasks: Add Wegovy Support

**Input**: `specs/008-add-wegovy-support/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/ui.md`, `quickstart.md`.

**Tests**: Required by project constitution for calculation behavior. Story tests should fail before implementation.

## Phase 1: Setup

- [ ] T001 Verify feature 007 is complete and run `npm test`; record baseline in `specs/008-add-wegovy-support/quickstart.md`

## Phase 2: Foundational

- [X] T002 Confirm selected-presentation contract in `assets/js/pen.js` carries unique ID, brand, device, active ingredient, labelled dose and count, total mg/ml, exact conversion basis, leaflet, warnings and optional click assumption; adapt without breaking 007
- [X] T003 Ensure `assets/js/calculator.js` accepts an exact total-mg/total-ml ratio as well as the labelled dose/volume ratios used by 007, with unknown IDs failing closed

## Phase 3: User Story 1 - Select a Wegovy Pen (P1)

**Goal**: Select and convert for six distinct Wegovy FlexTouch presentations. **Independent test**: labelled 0.5 mg dose converts to 0.375 ml for 2 mg/1.5 ml and 0.75 ml for 2 mg/3 ml.

- [X] T004 [P] [US1] Add independently derived fixtures for all six Wegovy pens, mixed amounts, fractional inputs, precision and selected limits in `tests/calculator.test.js`
- [X] T005 [P] [US1] Add selector tests distinguishing both 0.5 mg presentations and showing four doses and semaglutide in `tests/app.test.js`
- [X] T006 [US1] Add six FlexTouch presentations from `specs/008-add-wegovy-support/spec.md` to `assets/js/pen.js`, using exact total contents ratios and no click factor
- [X] T007 [US1] Display selected Wegovy brand, device, strength, total contents, dose count and calculated-equivalent basis in `assets/js/app.js` and `index.html`
- [X] T008 [US1] Add English and Polish Wegovy selection and conversion-basis text in `assets/js/i18n.js`

## Phase 4: User Story 2 - Change Pens and Understand Limits (P2)

**Goal**: Preserve safety context and prevent stale values when switching. **Independent test**: switch from original Mounjaro with a click input and over-limit amount to Wegovy, checking state, validation and leaflet.

- [X] T009 [P] [US2] Test switching from and to Wegovy, disabled click input and controls, stale results, selected limits and leaflet in `tests/app.test.js`
- [X] T010 [P] [US2] Test Wegovy-specific warnings and language changes in `tests/language-switch.test.js`
- [X] T011 [US2] Wire Wegovy selection to clear unsupported clicks, revalidate retained input and update output in `assets/js/app.js`
- [X] T012 [US2] Provide Wegovy-specific leaflet, residual-solution and mathematical-assumption context in `assets/js/pen.js` and `assets/js/app.js`
- [X] T013 [US2] Localize Wegovy warnings and unavailable click explanation in `assets/js/i18n.js`

## Phase 5: Polish & Cross-Cutting Concerns

- [X] T014 Update supported Wegovy scope, total-content assumption and validation in `README.md`
- [ ] T015 Run `npm test` and execute and record `specs/008-add-wegovy-support/quickstart.md` checks including full 007 regression

## Dependencies & Execution Order

Feature 007 → setup → foundation → US1 → US2 → polish. US2 integrates shared selection with the Wegovy data introduced in US1. Both stories have independent acceptance checks; feature 007's existing flows remain regression requirements.

## Parallel Opportunities

- US1: T004 and T005 cover separate test files and can run in parallel.
- US2: T009 and T010 cover separate test files and can run in parallel.

## Implementation Strategy

Deliver US1 as the MVP after the feature 007 foundation, validate its calculations independently, then complete switching and product context in US2. Finish with full regression and quickstart validation. Avoid concurrent edits to the same source or test file.
