# Tasks: Share Link Label

**Input**: `specs/010-share-link-label/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/sharing-instruction.md` and `quickstart.md`.

**Tests**: The specification calls for acceptance checks; the constitution requires behavior-change regression coverage. Add focused tests before the corresponding changes.

**Format**: `- [ ] Tnnn [P?] [USn?] Description with file path`; `[P]` means independently executable work on different files.

## Phase 1: Setup

- [X] T001 Run `npm test` against the existing calculator and record the baseline in `specs/010-share-link-label/quickstart.md`

## Phase 2: Foundational

- [X] T002 Identify the existing link rendering, locale keys and destination contract in `assets/js/app.js`, `assets/js/i18n.js` and `specs/009-target-dose-link/contracts/settings-link.md`; retain the existing link generator and parser

## Phase 3: User Story 1 — Share Settings Through a Concise Link (P1, MVP)

**Goal**: Show a localized sentence with a native, copyable link labelled “link” and the current settings as its destination.

**Independent test**: Select a pen and valid target, verify the exact English and Polish sentences and link label, then copy/open the destination and confirm the same pen and target.

### Tests

- [X] T003 [P] [US1] Extend `tests/target-ui.test.js` to check the exact English and Polish sentence segments, link label, unchanged href on language switch, and updated href after valid pen/target changes
- [X] T004 [P] [US1] Extend `tests/settings-link.test.js` with a previously generated 009 fragment and ambiguous 0.5 mg pen/subpath round-trip regression if not already covered

### Implementation

- [X] T005 [US1] Replace the current share text in `index.html` with a single sentence container and separately localizable prefix, native `#settings-link` anchor and suffix; only “link” must be clickable
- [X] T006 [US1] Define English “Share this link with preselected pen type and target value” and Polish “Udostępnij ten link z wybranym rodzajem pena i zamierzoną dawką” as independently translated sentence segments in `assets/js/i18n.js`, preserving correct whitespace
- [X] T007 [US1] Update `assets/js/app.js` to retain the localized anchor label while updating its actual destination from the existing settings-link generator; never assign the visible label to the full URL
- [X] T008 [US1] Preserve native link focus, activation and browser copy-link behavior and the existing 009 settings format in `index.html` and `assets/js/app.js`

**Checkpoint**: A valid state shows the requested sentence and a current destination without displaying the full URL.

## Phase 4: User Story 2 — Avoid a Stale Link (P2)

**Goal**: Hide the entire instruction for invalid target input and restore it with the corrected destination.

**Independent test**: Clear a valid target, verify no sentence or actionable old link remains, then enter a valid target and verify the current localized link returns.

### Tests

- [X] T009 [US2] Extend `tests/target-ui.test.js` to cover empty, zero, negative and malformed target values, whole-container visibility, removed/disabled old href, correction and language switch while valid or invalid

### Implementation

- [X] T010 [US2] Update `assets/js/app.js` so “Invalid target: No visible sharing instruction or actionable stale destination; existing target feedback remains visible”; hide the entire container and remove or disable the prior href
- [X] T011 [US2] Restore the complete localized sentence and current href on correction in `assets/js/app.js`, without changing selected settings, calculations, errors or safety warnings

**Checkpoint**: Both stories pass independently; previously generated links still restore their settings.

## Phase 5: Polish & Cross-Cutting Concerns

- [X] T012 Review `README.md` and update it only if its usage text no longer accurately describes the sharing link
- [ ] T013 Run `npm test` and the root/subpath, copy/open, language, keyboard and screen-reader checks in `specs/010-share-link-label/quickstart.md`; record completed checks and any unavailable validation

## Dependencies & Execution Order

Setup → foundation → US1 → US2 → polish. US2 builds on US1's shared sentence container, and each story has its own independent acceptance check. Tests precede their implementation. Keep edits to shared files sequential.

## Parallel Opportunities

- **US1**: T003 and T004 touch different test files and can be prepared concurrently.
- **US2**: T009 uses the same UI test file as T003 and follows its integration; no unsafe parallel edit is assumed.
- T012 can be reviewed independently after the intended wording is settled.

## Implementation Strategy

Complete setup and foundation, then deliver US1 as the smallest useful increment. Add invalid-target hiding and recovery in US2. Finish with the full existing regression suite and document actual manual/accessibility checks; do not claim screen-reader verification without observing it.
