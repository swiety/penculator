# Feature Specification: Live Dose Controls

**Feature Branch**: Not created

**Created**: 2026-11-13

**Status**: Draft

**Input**: User description: "Remove the 'Calculate total' button, recalculate and show totals on every value update. Also add up/down controls to each input, that would increase/decrease the value accordingly. mg should increase/decrease by 1mg, mls by 0.1ml, clicks by 1 click and fortieths by 1."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See totals as values change (Priority: P1)

A user enters or edits the amounts in the existing calculator and immediately sees the combined mathematical total in mg and ml, without a calculation button.

**Why this priority**: Automatic updates are the central change and remove a step from each calculation.

**Independent Test**: Enter 1 mg, then 0.1 ml, and verify that the visible result changes from 1 mg and 0.04 ml to 3.5 mg and 0.14 ml without a separate action.

**Acceptance Scenarios**:

1. **Given** no values have been entered, **When** the user enters 1 mg, **Then** the calculator displays 1 mg and 0.04 ml without pressing a calculation button.
2. **Given** 1 mg is entered, **When** the user enters 0.1 ml, **Then** the total updates to 3.5 mg and 0.14 ml.
3. **Given** a valid total is visible, **When** the user clears or changes a field, **Then** the result reflects the current fields or is removed if they no longer form a valid input; a previous result is never left visible as current.
4. **Given** the calculator is displayed, **When** the user looks for a calculation action, **Then** no "Calculate total" button is present.

### User Story 2 - Adjust values with controls (Priority: P1)

A user adjusts each field using its associated up and down controls and sees the total update as the field changes.

**Why this priority**: Step controls make repeated adjustments quick and avoid retyping values.

**Independent Test**: Starting with empty fields, use each up control once and verify the respective values become 1 mg, 0.1 ml, 1 click, and 1 fortieth; then use each down control once and verify each returns to zero.

**Acceptance Scenarios**:

1. **Given** the mg field contains 2.5, **When** its up control is activated, **Then** the field becomes 3.5 and the total updates; activating down next returns it to 2.5.
2. **Given** the ml field contains 0.15, **When** its up control is activated, **Then** the field becomes 0.25, and activating down returns it to 0.15.
3. **Given** the clicks or fortieths field contains 2, **When** its down control is activated, **Then** that field becomes 1 and the total updates.
4. **Given** a field is empty, **When** its up control is activated, **Then** the field becomes one step; activating down on an empty field leaves it empty.
5. **Given** a valid value between zero and one step, **When** its down control is activated, **Then** the field becomes zero and never negative.

### User Story 3 - Recover from invalid values (Priority: P2)

A user receives clear feedback for input that cannot be calculated and can correct it without seeing a stale result.

**Why this priority**: Live editing can temporarily produce incomplete or invalid values, and results must not be misleading.

**Independent Test**: Enter an invalid value after a valid result, then correct it, and verify the result disappears and returns with the corrected value.

**Acceptance Scenarios**:

1. **Given** a valid result, **When** the user enters malformed text, a negative value, a fractional count, or values exceeding one labelled dose, **Then** no total is shown and a corrective message is visible.
2. **Given** a field contains malformed or negative input, **When** the user activates its up or down control, **Then** its text is left unchanged and an explanation asks the user to correct it.
3. **Given** invalid input, **When** the user corrects it to valid values, **Then** the error is removed and the current total is shown automatically.

### Edge Cases

- An untouched or fully cleared form shows no result and no error; a zero-only form shows no result and explains that a positive amount is required.
- Decimal input accepts a point or comma. An incomplete decimal such as `1,` produces no result until corrected; no prior total remains visible.
- Stepping preserves the entered fractional offset rather than snapping it to a step grid. Decreasing a valid non-negative value below one step clamps it to zero.
- Stepping from zero down leaves zero; from an empty field, up uses zero as the starting value and down leaves the field empty.
- If a step causes the combined exact total to exceed the existing one-dose limit, the new field value remains visible, the total disappears, and an explanation is shown. The user can step down or edit to recover.
- A positive value below existing display precision produces no misleading zero result; an explanatory message appears.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The calculator MUST remove the "Calculate total" button and automatically recalculate whenever any amount field is typed, pasted, cleared, or changed using its up/down controls.
- **FR-002**: For valid current input, the calculator MUST display the combined total in mg and ml without requiring the user to submit or change focus; it MUST update or remove any earlier result on every input change.
- **FR-003**: Each of the four amount fields MUST have separately identifiable increase and decrease controls, operable by pointer, touch, and keyboard, with accessible names identifying the associated field and direction.
- **FR-004**: Each activation MUST add or subtract exactly 1 mg, 0.1 ml, 1 click, or 1 fortieth of 1 ml from the corresponding field, respectively, preserving any valid fractional offset in mg or ml. Stepping MUST NOT change other fields.
- **FR-005**: When a field is empty, increase MUST set it to one step and decrease MUST leave it empty. Decreasing a valid non-negative value smaller than a step MUST set it to zero; zero MUST NOT decrement below zero.
- **FR-006**: Step controls MUST NOT overwrite malformed or negative text. They MUST leave it unchanged and show a corrective message until the user corrects the value.
- **FR-007**: An untouched or fully cleared form MUST show no result and no error. After an input update, a zero-only form, malformed input, negative value, fractional click or fortieth count, precision-limit failure, or combined exact total exceeding 15 mg / 0.6 ml MUST show no result and provide a corrective explanation. Correcting input MUST automatically restore a valid result and remove the error.
- **FR-008**: The calculator MUST continue to add values across fields before rounding, apply the existing one-dose limit to the exact sum, and display mg and ml with units and approximation indicators under `specs/003-add-dose-inputs/spec.md` FR-003 through FR-007.
- **FR-009**: The existing pen selection, four fixed labelled doses, product leaflet, non-medical disclaimer, and limitations for fractional calculations and the unverified 60-click assumption MUST remain visible as specified in `specs/003-add-dose-inputs/spec.md` FR-001 and FR-009 through FR-013.
- **FR-010**: The fields, controls, feedback, and results MUST remain usable on phone and desktop without horizontal scrolling; keyboard focus and control names MUST make the adjustment action understandable without a pointer.

### Key Entities *(include if feature involves data)*

- **Amount field**: One of mg, ml, clicks or fortieths; its current text, valid numeric value when available, and step size.
- **Live result**: The current combined mathematical total in mg and ml or an absent result accompanied by relevant feedback.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance testing, 100% of valid typed, pasted, cleared, and stepped changes update or remove the result to match the current field values without a submit action.
- **SC-002**: In acceptance testing, 100% of step examples and zero, empty, fractional-offset, invalid-input and one-dose-limit edge cases follow the specified behavior.
- **SC-003**: At least 90% of first-time test users can adjust a field and identify the updated total without assistance within 30 seconds.
- **SC-004**: In phone and desktop usability checks, all participants can operate each increase/decrease control and locate the updated result and relevant error without horizontal scrolling.

## Assumptions

- This feature builds on `specs/003-add-dose-inputs/spec.md`; where that specification describes a calculation action or permits merely clearing the old result after a valid edit, this feature requires automatic recalculation instead.
- The step size controls adjustment magnitude, not permitted input precision: direct mg and ml values need not be multiples of 1 or 0.1 respectively.
- Values produced by controls are mathematical input changes, not instructions for operating an injection device. Existing product and medical-context limitations continue to apply.
- An initially empty field is not automatically populated; no personal data or calculation history is stored.
