# Tasks: Target Dose and Shareable Link

**Input**: `specs/009-target-dose-link/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/settings-link.md`, and `quickstart.md`.

**Tests**: The specification requires acceptance testing, and the constitution requires automated tests for behavior changes. Write the story tests before the corresponding implementation.

**Format**: `- [ ] Tnnn [P?] [USn?] Description with file path`; `[P]` denotes independent work on different files, and `[USn]` identifies a user story.

## Phase 1: Setup

- [X] T001 Run the existing `npm test` baseline and record pass/fail and any pre-existing failures in `specs/009-target-dose-link/quickstart.md`

## Phase 2: Foundational

- [X] T002 Create `assets/js/target-settings.js` as a pure settings module and define a default state from the existing unique pen ID and `doseMg` in `assets/js/pen.js`; keep calculator state independent
- [X] T003 Establish separate target and link feedback state in `assets/js/app.js` without changing existing calculation fields, errors, warnings or direct pen-switch behavior

## Phase 3: User Story 1 — Set a Target Amount (P1, MVP)

**Goal**: Show an independently adjustable target defaulted to the selected pen's labelled dose.

**Independent test**: Select Mounjaro 15 mg, check 15 mg; enter 7.5 mg, use plus and minus to obtain 8.5 and 7.5, then enter 16 mg and check the calculator fields remain unchanged.

### Tests

- [X] T004 [P] [US1] Add `tests/target-amount.test.js` cases for all pen defaults, decimal point/comma, values above a labelled dose, exact large/fractional values, 1 mg steps and non-positive decrement boundaries
- [X] T005 [P] [US1] Add `tests/target-ui.test.js` cases for selecting every pen, default/reset behavior, target-only edits, accessible control names, English/Polish labels and unchanged calculation inputs/results

### Implementation

- [X] T006 [US1] Implement exact parsing and +/- 1 mg in `assets/js/target-settings.js`: "Accept digits with optional complete `.` or `,` fraction; reject empty, zero, negative, malformed and incomplete text. No maximum based on labelled dose."; "Invalid text is unchanged; a decrement to zero or below leaves the positive value unchanged and reports the boundary."
- [X] T007 [US1] Add a separate labelled mg target field, accessible +/- buttons and distinct feedback in `index.html`, with responsive layout and focus styles in `assets/css/style.scss`
- [X] T008 [US1] Add English/Polish labels, positive-boundary and mathematical-setting safety messages in `assets/js/i18n.js`
- [X] T009 [US1] Wire target defaults, direct pen-change reset, edits and isolated step controls in `assets/js/app.js`; ensure they never enter the existing four-field sum or the generic calculation-control handler

**Checkpoint**: US1 is usable and independently verifiable without the shared-link story.

## Phase 4: User Story 2 — Share and Restore Settings (P1)

**Goal**: Provide a link that restores the exact pen and target on fresh load or fragment navigation.

**Independent test**: Select Ozempic 0.5 mg, 2 mg/3 ml, set 0.25 mg, open the displayed link on a fresh page and under `/penculator/`, and verify the exact pen and target.

### Tests

- [X] T010 [P] [US2] Add `tests/settings-link.test.js` round-trip cases for all 19 pen IDs, both 0.5 mg presentations, fractional and above-labelled targets, canonical decimals and root/subpath/query preservation
- [X] T011 [US2] Add `tests/target-ui.test.js` cases for link text/destination updates, fresh-load restoration before default reset, fragment navigation and links excluding calculation inputs and language

### Implementation

- [X] T012 [US2] Implement canonical `#settings?pen=<id>&target=<decimal>` encoding and valid pair decoding in `assets/js/target-settings.js`; preserve current origin, path and query, and serialize only one stable presentation ID and one exact point-decimal target
- [X] T013 [US2] Add a visible, keyboard-accessible anchor and localized description in `index.html` and `assets/js/i18n.js`; explain that sharing exposes the chosen settings
- [X] T014 [US2] Restore a validated linked pair before the first final render, update the current anchor after valid changes and handle fragment navigation in `assets/js/app.js`, retaining calculator inputs
- [X] T015 [US2] Revalidate retained calculation inputs and recalculate or show an error when a restored link changes the pen in `assets/js/app.js`; never clear retained inputs, including now-unsupported clicks, and preserve result/error for target-only changes

**Checkpoint**: Valid links round-trip exactly; US1 remains independently functional.

## Phase 5: User Story 3 — Recover from Invalid Input or Link (P2)

**Goal**: Prevent stale links and partial settings restoration while providing clear recovery.

**Independent test**: Clear a previously valid target, then open a recognized fragment with an unknown pen; verify no stale link, atomic default fallback, localized feedback and recovery after correction.

### Tests

- [X] T016 [P] [US3] Extend `tests/settings-link.test.js` with missing/duplicate/extra keys, empty values, unknown IDs, malformed percent escapes and invalid UTF-8; assert recognized invalid pairs apply neither value and unrelated anchors are ignored
- [X] T017 [P] [US3] Extend `tests/target-ui.test.js` with empty, zero, negative, incomplete and malformed input, invalid step, stale-anchor removal, correction and localized feedback without disturbing calculation errors
- [X] T018 [US3] Extend `tests/target-ui.test.js` with invalid initial and later fragment navigation, default fallback, unchanged calculation inputs and recovery to a valid pair

### Implementation

- [X] T019 [US3] Implement strict fragment validation in `assets/js/target-settings.js`: "A recognized fragment requires exactly one `pen` and exactly one `target`, no extra keys, valid percent escapes and UTF-8, an existing catalog ID and a strictly positive complete decimal."
- [X] T020 [US3] Add atomic invalid-link fallback, distinct localized error and unrelated-fragment handling in `assets/js/app.js` and `assets/js/i18n.js`; never apply a partial pair
- [X] T021 [US3] Hide or disable the actionable anchor and remove its stale destination while target text is invalid; restore it after correction or a pen reset in `assets/js/app.js`

**Checkpoint**: Every story's independent acceptance scenario is supported and errors are recoverable.

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T022 [P] Document target behavior, shareable fragment and visibility to link recipients in `README.md`
- [ ] T023 Run `npm test` and perform root/subpath, keyboard, phone/desktop and both-language checks from `specs/009-target-dose-link/quickstart.md`; record actual outcomes and unverified usability targets there

## Dependencies & Execution Order

Setup → Foundation → US1 → US2 → US3 → Polish. US2 relies on US1's target state; US3 extends both target and link flows. Each story has a separate acceptance test and can be verified at its checkpoint. Tests precede their implementation. Changes to shared files such as `assets/js/app.js` and `assets/js/target-settings.js` are sequential.

## Parallel Opportunities

- **US1**: T004 and T005 can be written concurrently because they touch separate test files.
- **US2**: T010 and T011 cover separate files after the foundation is available.
- **US3**: T016 and T017 cover separate files after US1/US2 test work is integrated; T018 shares the UI test file with T017 and follows it.
- T022 can proceed independently of the final validation once the intended behavior is stable.

## Implementation Strategy

Complete setup and foundation, then implement and validate US1 as the smallest usable increment. Add valid share/restore in US2, then invalid-input and invalid-link recovery in US3. Finish with the complete automated suite and documented manual checks; do not report the user-study criterion as met without participant evidence.
