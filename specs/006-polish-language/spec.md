# Feature Specification: Polish Language Support

**Feature Branch**: Not created

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "Add Polish language support, translate the whole UI to Polish, offer a compact UI widget to select the language. On initial visit determine the preferred language from the browser headers."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Use the calculator in Polish (Priority: P1)

A Polish-speaking user opens the calculator and reads the full interface, calculation feedback and important limitations in Polish.

**Why this priority**: Complete, accurate Polish content is the central value of the feature.

**Independent Test**: Open the calculator with Polish as the highest-preference supported language, enter valid and invalid values, and verify the interface, results, feedback and warnings are in Polish.

**Acceptance Scenarios**:

1. **Given** no saved language choice and a browser preference list beginning with Polish, **When** the user opens the calculator, **Then** the interface appears in Polish.
2. **Given** the Polish interface, **When** the user enters valid values or invalid text, **Then** the result labels, units, approximation indication, validation message and relevant warnings are understandable in Polish.
3. **Given** the Polish interface, **When** the user reads the product information and disclaimer, **Then** the translation preserves the meaning and qualifications of the English text.

### User Story 2 - Select and retain a language (Priority: P1)

A user can find a compact language selector and switch between Polish and English without losing the current calculation.

**Why this priority**: Browser preferences may not reflect the language the user wants for this visit.

**Independent Test**: Enter values, switch languages in both directions, reload and verify the selected language and calculation state behavior described below.

**Acceptance Scenarios**:

1. **Given** the calculator in either language, **When** the user chooses the other language, **Then** all current interface text, including any visible result, warning or error, changes to the selected language without submitting the form.
2. **Given** entered values and a visible result or error, **When** the user changes language, **Then** the entered text and its validity are preserved, and the current result or error remains accurate and is presented in the selected language.
3. **Given** an explicit language choice and available preference storage, **When** the user reloads or returns in the same browser, **Then** that choice takes precedence over browser preferences.
4. **Given** the language selector, **When** the user operates it with keyboard, touch or pointer, **Then** both language choices and the current selection are identifiable and operable.

### User Story 3 - Use a supported fallback (Priority: P2)

A user whose browser preferences are unavailable or do not include a supported language can still use the calculator and choose a language.

**Why this priority**: Automatic selection must not prevent access when a preference cannot be matched.

**Independent Test**: Open the page with unsupported, empty, and mixed language preference lists and confirm the specified selection and fallback rules.

**Acceptance Scenarios**:

1. **Given** no saved choice and browser preferences ordered French, Polish, English, **When** the page opens, **Then** Polish is selected as the first supported preference.
2. **Given** no saved choice and browser preferences ordered English, Polish, **When** the page opens, **Then** English is selected.
3. **Given** no saved choice and no supported or available browser preference, **When** the page opens, **Then** English is selected and the language selector remains available.

### Edge Cases

- Language variants such as `pl-PL` and `en-GB` match their respective supported base language, without regard to case; unsupported languages are skipped in preference order.
- An invalid or obsolete saved choice is ignored and the browser preference selection is applied. If preferences cannot be saved, switching still works for the current page and a later visit uses browser preferences again.
- Switching while an input contains incomplete or invalid text must preserve that exact text and translate the current feedback; switching must not reveal a stale result.
- Longer Polish text and the selector may wrap; labels, controls, feedback, warnings and results remain readable and reachable without horizontal page scrolling at widths of 320 CSS pixels and above, including at 200% text enlargement.
- The existing external manufacturer leaflet may be in English; its link remains available and the interface identifies its language if it differs from the selected interface language.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The calculator MUST support complete English and Polish interfaces, covering all user-visible page content, site navigation and title, labels, instructions, placeholders, controls, result labels, feedback, warnings, disclaimers and language-selector text, including content shown only in particular states.
- **FR-002**: Polish translations MUST preserve the meaning, units, limitations, uncertainty, manufacturer advice and non-medical character of the corresponding English content; they MUST NOT add dosing advice or imply greater certainty.
- **FR-003**: On a visit without a valid saved choice, the calculator MUST choose the first supported language in the browser's ordered language preferences, matching Polish and English language variants to their base languages; when no preference matches or preferences are unavailable, it MUST use English.
- **FR-004**: A compact, consistently available language selector MUST offer Polish and English, identify the active selection, and be operable and understandable by keyboard, pointer, touch and assistive technology. Language choices MUST be identifiable in their own languages.
- **FR-005**: An explicit language choice MUST take effect immediately for all currently displayed content and be retained for later visits in the same browser when preference storage is available; it MUST take precedence over automatic selection. If storage is unavailable, selection MUST still work during the current page visit.
- **FR-006**: Switching languages MUST preserve the selected pen, exact input text, current validity and calculation state. A valid result MUST retain its numeric value, units and approximation status; an invalid state MUST retain its corrective feedback without showing a stale result.
- **FR-007**: Accessible names, document language, relevant field descriptions and live feedback MUST reflect the selected language. Switching MUST NOT remove keyboard focus without a user action.
- **FR-008**: Calculations, input formats, step increments, rounding, limits, validation, live updates and existing warning visibility MUST remain as specified in `specs/004-live-dose-controls/spec.md` and its referenced specifications. Both comma and point remain accepted for decimal input in both languages.
- **FR-009**: The language selector and translated content MUST preserve the compact layout and reflow requirements in `specs/005-compact-calculator/spec.md`, including its specified initial viewport targets and 320-pixel and 200% text-enlargement behavior; translated warning and feedback text MUST remain readable and reachable.
- **FR-010**: The manufacturer leaflet link MUST remain available; if its destination is not in the selected language, its link label or adjacent text MUST make the destination language clear. Translation of external documents is outside this feature's scope.

### Key Entities

- **Language preference**: A supported language, either automatically selected from the browser's ordered preferences or explicitly selected by the user and retained when possible.
- **Localized interface content**: The text and accessible descriptions for each supported language, including state-dependent errors, warnings and results.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance checks, 100% of inventoried interface text and accessible names, including every validation and warning state, appear in the selected language; Polish safety and product statements retain the meaning of their English counterparts.
- **SC-002**: In acceptance checks, all specified first-visit, ordered-preference, variant, fallback, saved-choice and unavailable-storage scenarios select the expected language.
- **SC-003**: In acceptance checks, switching languages in valid, invalid and empty form states preserves input and calculation state in 100% of cases.
- **SC-004**: At least 90% of first-time participants can find the language selector, switch languages and identify the resulting calculation within 30 seconds without assistance.
- **SC-005**: Both languages meet the compact viewport and reflow acceptance criteria in `specs/005-compact-calculator/spec.md`; all existing calculation and validation acceptance cases pass in both languages.

## Assumptions

- English remains the existing default and the only additional language in scope is Polish. Browser language preferences are the desired source of automatic selection; the implementation approach for this static site is determined during planning.
- The selected language is a browser-local preference; no account, personal profile, or server-side storage is required. Calculation values need not persist across reloads.
- Product names, mathematical notation and standardized units may remain unchanged where appropriate; Polish prose and terminology should be reviewed for accuracy and naturalness.
- The compact-layout feature has outstanding validation from its implementation. This feature must meet its stated requirements, but does not imply those earlier checks have already passed.
