# Tasks: Expand Pen Support

**Input**: `specs/007-expand-pen-support/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/ui.md`, `quickstart.md`.

**Tests**: Required by project constitution for calculation behavior. Story tests should fail before implementation.

## Phase 1: Setup

- [ ] T001 Check baseline `npm test` and record any existing failures in `specs/007-expand-pen-support/quickstart.md`

## Phase 2: Foundational

- [ ] T002 Define immutable presentation catalog and fail-closed lookup in `assets/js/pen.js`; require unique ID, brand, device, ingredient, labelled dose and count, total mg/ml, exact conversion basis, leaflet, warnings and optional click assumption
- [ ] T003 Refactor `assets/js/calculator.js` to accept a presentation with exact rational dose and conversion factors; preserve 15 mg default and input contracts
- [ ] T004 Implement selected-dose limit, four-decimal half-up rounding, approximation flags and zero-rounding rejection in `assets/js/calculator.js`
- [ ] T005 Establish selected-pen state and selection change handling in `assets/js/app.js`, preserving existing input and language behavior

## Phase 3: User Story 1 - Mounjaro KwikPens (P1)

**Goal**: Select and calculate for all six strengths. **Independent test**: each labelled dose gives 0.6 ml; 5 mg pen at 2.5 mg gives 0.3 ml.

- [ ] T006 [P] [US1] Add calculation tests for six strengths, mixed inputs, fractional doses and 15 mg regression in `tests/calculator.test.js`
- [ ] T007 [P] [US1] Add selector and product-context tests for all Mounjaro strengths in `tests/app.test.js`
- [ ] T008 [US1] Add six Mounjaro KwikPen entries with four doses and 0.6 ml per dose in `assets/js/pen.js`
- [ ] T009 [US1] Populate accessible selector and selected-product context in `index.html` and `assets/js/app.js`
- [ ] T010 [US1] Add selected-pen labels, limits and relevant localized safety text in `assets/js/i18n.js`

## Phase 4: User Story 2 - Ozempic Pens (P1)

**Goal**: Select and calculate for seven distinct EU Ozempic presentations. **Independent test**: the 0.5 mg/3 ml 2 mg and 4 mg presentations give 0.74 and 0.37 ml respectively.

- [ ] T011 [P] [US2] Add fixtures for all seven Ozempic dose-volume ratios, mixed inputs and rounding in `tests/calculator.test.js`
- [ ] T012 [P] [US2] Add selection and product-specific leaflet/context tests for all Ozempic presentations in `tests/app.test.js`
- [ ] T013 [US2] Add the seven entries and exact labelled dose/volume ratios from `specs/007-expand-pen-support/spec.md` to `assets/js/pen.js`
- [ ] T014 [US2] Render unique dose and total contents, selected leaflet and dose count for Ozempic in `assets/js/app.js` and `index.html`
- [ ] T015 [US2] Localize Ozempic product identity and context in `assets/js/i18n.js`

## Phase 5: User Story 3 - Change Pens Safely (P2)

**Goal**: Avoid stale results and unsupported clicks on switching. **Independent test**: switch with an over-limit amount and click input and verify clearing, revalidation and updated context.

- [ ] T016 [P] [US3] Add selection-switch tests for stale results, unsupported click clearing, disabled click step controls, limits and leaflet in `tests/app.test.js`
- [ ] T017 [P] [US3] Add invalid ID, boundary, malformed, zero and too-small regression tests in `tests/validation.test.js`
- [ ] T018 [US3] Clear and disable unsupported click input and its controls and explain unavailability in `assets/js/app.js` and `index.html`
- [ ] T019 [US3] Revalidate retained input and clear or recompute results immediately on pen switch in `assets/js/app.js`
- [ ] T020 [US3] Localize selected limits, click availability and switching warnings in `assets/js/i18n.js`

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T021 [P] Add language-switch and phone/desktop selection-context checks in `tests/language-switch.test.js`
- [ ] T022 Update supported pen scope, assumptions and usage in `README.md`
- [ ] T023 Run `npm test` and execute and record `specs/007-expand-pen-support/quickstart.md` checks

## Dependencies & Execution Order

Setup → foundation → US1 → US2 → US3 → polish. US2 and US3 build on shared selection work; their independent acceptance criteria remain testable. Feature 008 depends on completed 007 foundation and regression coverage; complete 007 first for clean integration.

## Parallel Opportunities

- US1: T006 and T007 cover separate test files and can run in parallel.
- US2: T011 and T012 cover separate test files and can run in parallel.
- US3: T016 and T017 cover separate test files and can run in parallel.

## Implementation Strategy

Deliver and verify US1 as MVP, then extend the same catalog for US2 and verify switching in US3. Finish regression and quickstart checks before implementing feature 008. Avoid concurrent edits to the same source or test file.
