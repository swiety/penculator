# Feature Specification: Compact Calculator Layout

**Feature Branch**: Not created

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "The page is too high, so I need to scroll down to see the calculated amounts. I would prefer the page to be more compact so it fits even on smaller screens. One thing that comes to my mind is to move the +- controls inside the numerical inputs, as smaller icons placed vertically to the right side of the input. Can you think of other ideas to make the screen more compact, without impacting the overall ergonomics?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See the calculation without scrolling (Priority: P1)

A user enters an amount and can see the inputs and calculated amounts together on a smaller screen, making changes and checking the result without repeatedly scrolling.

**Why this priority**: Seeing the result is the reason for reducing the page height.

**Independent Test**: At the viewport sizes specified in SC-001, enter 1 mg and verify the four inputs, their labels and controls, the click warning, and both calculated amounts are visible together without vertical scrolling.

**Acceptance Scenarios**:

1. **Given** a 768 × 768 or 390 × 844 CSS-pixel viewport at 100% zoom and the page at the top, **When** the user enters 1 mg, **Then** all four labelled amount fields and both result values with units are visible without vertical scrolling.
2. **Given** a visible result, **When** the user changes an amount, **Then** the updated result remains visible without a separate calculation action.
3. **Given** a narrower or shorter viewport, **When** the content cannot fit, **Then** the user can scroll to all fields, results, warnings, and information without horizontal page scrolling.

### User Story 2 - Adjust amounts comfortably (Priority: P1)

A user can type and adjust each amount using compact, clearly associated increase and decrease controls, including with a keyboard or touch.

**Why this priority**: Saving vertical space must not make common adjustments difficult or ambiguous.

**Independent Test**: Enter and adjust each amount with pointer, touch and keyboard, and verify that its associated value and live result change according to existing rules.

**Acceptance Scenarios**:

1. **Given** an amount field, **When** the user looks for its controls, **Then** increase and decrease are distinguishable and associated with that field and do not obscure its value or unit.
2. **Given** keyboard navigation, **When** the user reaches and activates either control, **Then** its focus and purpose are apparent and it adjusts only the associated field.
3. **Given** a touch screen, **When** the user activates a control, **Then** the intended control can be selected without inadvertently activating its neighbor or editing the value.

### User Story 3 - Understand results and limitations (Priority: P2)

A user can find relevant input guidance, validation feedback, and product limitations while using the more compact layout.

**Why this priority**: Compactness must preserve the information needed to interpret the calculation safely.

**Independent Test**: Enter a click value and invalid input, then locate the relevant warning and feedback; also locate the existing product and non-medical information.

**Acceptance Scenarios**:

1. **Given** any amount input, **When** the calculator is shown, **Then** the warning about the unverified click assumption and manufacturer advice remains visible without an extra action.
2. **Given** invalid input, **When** feedback appears, **Then** it is readable, associated with the input and does not overlap controls or display a stale total.
3. **Given** a valid result involving clicks, **When** the user reads it, **Then** the existing result-specific click warning is available without an extra action.

### Edge Cases

- A long value, large text, browser zoom, translated or wrapped text, or an error message can increase content height; all content remains reachable and readable without overlap or horizontal page scrolling.
- When the result is absent because the form is empty or invalid, no stale result is displayed; feedback remains readable.
- Small or short viewports may require vertical scrolling, and the result-specific warning can add height when clicks are used.
- Focus indicators remain visible when controls are close together, including when a field or control is disabled or invalid under existing behavior.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The calculator MUST reduce the vertical space used before and within the input and result areas while keeping all four labelled fields and both calculated amounts together in the initial viewport under SC-001 conditions.
- **FR-002**: Each amount field MUST retain independently identifiable increase and decrease controls. A compact vertical arrangement at the right edge of the input is a design candidate; the final arrangement MUST meet the usability requirements below.
- **FR-003**: Field values, labels, units, controls, focus indicators, validation feedback, and results MUST remain legible, distinguishable, and free of overlap at the viewport sizes in SC-001 and when text is enlarged to 200%.
- **FR-004**: Users MUST be able to type values and operate each adjustment control using pointer, touch, and keyboard. Controls MUST retain accessible names identifying their field and direction, visible keyboard focus, and touch targets of at least 24 × 24 CSS pixels or equivalent spacing that prevents adjacent targets from overlapping.
- **FR-005**: The layout MUST adapt to available width without horizontal page scrolling at widths of 320 CSS pixels and above, including when text is enlarged to 200%; vertical scrolling is allowed when content cannot fit.
- **FR-006**: The pen selection, field guidance, click warning, validation feedback, result units and approximation indicators, result-specific click warning, product leaflet link, and existing medical and product limitations MUST remain available; the click warning and result-specific warning MUST NOT require an extra action to reveal.
- **FR-007**: The calculator MUST preserve current calculation, live update, input validation, adjustment increments, precision, rounding, and limit behavior specified in `specs/004-live-dose-controls/spec.md` and its referenced specifications.
- **FR-008**: The page MUST retain a clear visual distinction between editable inputs, calculated amounts, warnings, and supporting information, without requiring users to remember hidden labels or units.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At 100% zoom, with 1 mg entered and no errors, all four labelled amount fields, their adjustment controls, the click warning, and both result values with units fit without vertical scrolling at both 768 × 768 and 390 × 844 CSS-pixel viewports, starting at the top of the page.
- **SC-002**: At widths of 320 CSS pixels and above and at 200% text enlargement, all fields, controls, feedback, results, and supporting information remain reachable and readable without horizontal page scrolling or overlapping content.
- **SC-003**: In usability checks, at least 90% of first-time participants can enter an amount, adjust it once, and identify both updated result values without assistance within 30 seconds.
- **SC-004**: Every field can be adjusted in both directions with pointer, touch, and keyboard, and all existing calculation and validation acceptance cases continue to pass.

## Assumptions

- The specified viewport sizes are representative compact-screen targets, not a guarantee that every possible screen, input value, zoom level, or message will fit without vertical scrolling.
- Potential space savings include reducing introductory and section spacing, simplifying repeated headings, arranging fields efficiently where width permits, and reducing card padding. The final design should retain readability and accessible controls.
- The user's proposed controls are a design option rather than a mandate to make touch targets too small; their icons may be smaller than their interactive areas.
- This feature changes presentation and layout, not the supported pen, calculations, or medical and product limitations. Supporting information may appear below the initial viewport but remains available.
