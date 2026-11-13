# Feature Specification: Multiple Dose Inputs

**Feature Branch**: Not created

**Created**: 2026-11-13

**Status**: Draft — ready for planning

**Input**: User description: "Start with 15mg pen, it contains 4 doses, each of 15mg/0.6ml. The user will pick up a pen type (for now only 15mg is supported), then will have 4 numeric input fields, allowing to enter respectively: amount of mgs, amount of mls, number of clicks, amount of 1/40s of 1ml. User enters a numeric values to at least 1 of those 4 input fields. The application calculates the over dose size in both mgs and mls and displays them to the user. 60 clicks make a 15mg doze. The application also displays a disclaimer bottom of the screen that it is not intended to be used for medical purposes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Calculate from a chosen input (Priority: P1)

A user selects the 15 mg pen and enters an amount in at least one of four units to see its mathematical equivalent in mg and ml.

**Why this priority**: This is the primary calculation the application exists to provide.

**Independent Test**: Select the pen, enter 15 mg alone and verify the displayed result is 15 mg and 0.6 ml.

**Acceptance Scenarios**:

1. **Given** the 15 mg pen is selected, **When** the user enters 15 mg alone, **Then** the result is 15 mg and 0.6 ml.
2. **Given** the 15 mg pen is selected, **When** the user enters 0.6 ml alone, **Then** the result is 15 mg and 0.6 ml.
3. **Given** the 15 mg pen is selected, **When** the user enters 60 clicks alone, **Then** the mathematical result is 15 mg and 0.6 ml, labelled as based on an unverified user-supplied assumption.
4. **Given** the 15 mg pen is selected, **When** the user enters 24 units of 1/40 ml alone, **Then** the result is 15 mg and 0.6 ml.
5. **Given** a result is displayed, **When** any input is changed or cleared, **Then** the old result is cleared or updated so it is not mistaken for the current values.

### User Story 2 - Enter multiple values (Priority: P1)

A user may fill more than one field and receive a result according to a consistent interpretation of the values.

**Why this priority**: The requested interface explicitly permits at least one field, including multiple fields.

**Independent Test**: Enter 1 mg and 0.1 ml and verify that the combined result is 3.5 mg and 0.14 ml.

**Acceptance Scenarios**:

1. **Given** the 15 mg pen is selected, **When** the user enters 1 mg and 0.1 ml, **Then** the application adds their equivalents and displays 3.5 mg and 0.14 ml.
2. **Given** the 15 mg pen is selected, **When** the user enters 10 mg and 0.3 ml, **Then** the combined amount exceeds one labelled dose and no result is displayed.

### User Story 3 - Understand the calculation's limits (Priority: P2)

A user sees the product context, the limitations of mathematical conversions and the requested disclaimer while using the application.

**Why this priority**: The calculator must not be mistaken for instructions to use a medical device.

**Independent Test**: Open the calculator on a phone and desktop and inspect the product details, limitation and bottom-of-screen disclaimer.

**Acceptance Scenarios**:

1. **Given** the calculator is open, **When** the user views the bottom of the screen, **Then** a disclaimer states that the application is not intended for medical purposes.
2. **Given** the calculator is open, **When** the user views the click input or a result, **Then** it states that counting clicks is not recommended by the manufacturer and that a computed amount does not establish deliverability.

### Edge Cases

- All fields empty, malformed values, negative values, and zero-only inputs yield an explanation and no result.
- Decimal points and commas are accepted; malformed numbers are rejected. Counts of clicks and 1/40 ml units are whole numbers.
- An invalid field prevents a result even when another field is valid; clearing or correcting it allows recalculation.
- Values below the display precision must not be presented as zero; rounded values are identified as approximate.
- An amount beyond one labelled dose is rejected; residual medicine after four labelled doses is not treated as an additional usable dose.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST provide a pen-type selection with Mounjaro 15 mg KwikPen as the only supported choice, and identify four labelled doses of 15 mg in 0.6 ml each.
- **FR-002**: The application MUST provide four separately labelled numeric fields: mg, ml, clicks, and count of 1/40 ml units; at least one positive value is required.
- **FR-003**: For a single populated field, the application MUST calculate the corresponding amount in mg and ml using 15 mg per 0.6 ml, 60 clicks per 15 mg as the user-supplied assumption, and 1 unit equal to 1/40 ml.
- **FR-004**: The application MUST treat each populated field as a separate amount, convert each using the ratios in FR-003, and add the amounts to obtain a combined result in mg and ml. The inputs MUST be summed before result rounding.
- **FR-005**: The application MUST display the calculated amount with both mg and ml units. Results MUST be rounded to at most four decimal places in each unit, to nearest with ties away from zero, and any rounded value MUST be labelled approximate. Values that would round to zero in either unit MUST be rejected with an explanation.
- **FR-006**: The application MUST accept decimal points and commas for mg and ml; clicks and 1/40 ml units MUST be whole numbers. Empty fields contribute no value; malformed, negative, or zero-only entries MUST produce an explanation and no result. Individual zero values may accompany positive values.
- **FR-007**: The application MUST reject a calculated total greater than 15 mg or 0.6 ml, with a message explaining the one-labelled-dose limit. The limit applies to the combined amount before rounding.
- **FR-008**: Changing or clearing any input MUST clear or update any previous result, and the user MUST be able to perform another calculation.
- **FR-009**: The application MUST show a disclaimer at the bottom of the screen stating that it is not intended for medical purposes.
- **FR-010**: The calculation view MUST say that conversions are mathematical, not dosing advice or operating instructions; that a fractional calculation does not establish deliverability; and that the user should follow the prescribed dose and consult a doctor or pharmacist about use.
- **FR-011**: Next to the click input and any click-based result, the application MUST identify the 60-click relationship as an unverified user-supplied assumption and state that the manufacturer advises against counting clicks to select a dose.
- **FR-012**: The application MUST state that the pen has four fixed labelled doses and residual medicine after those doses must not be used, and provide access to the manufacturer’s patient leaflet while advising users to check their own product information.
- **FR-013**: The primary flow and disclaimer MUST be usable on phone and desktop without horizontal scrolling.

### Key Entities *(include if feature involves data)*

- **Pen type**: Product identity, labelled amount, volume and number of doses, and the assumed click relationship.
- **Calculation inputs**: Up to four numeric values expressed in different units.
- **Calculation result**: Equivalent amounts in mg and ml, with a rounding indicator when needed.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All single-input and multi-input acceptance examples yield the specified mg and ml values; 100% of a representative test set of conversions and rounding boundaries matches independently calculated expectations.
- **SC-002**: All specified invalid, precision-limit and over-limit cases produce no result and show a corrective explanation in acceptance testing.
- **SC-003**: At least 90% of first-time test users can select the pen, use any chosen input field, and find both units of the result within 45 seconds without assistance.
- **SC-004**: In phone and desktop usability checks, all participants can locate the disclaimer and click limitation.

## Assumptions

- This feature supersedes the earlier single-input specification where they conflict, including its exclusion of click counts. Other pen strengths and dose schedules are outside scope.
- The 60-click relationship is supplied by the user and is not established here as a reliable device calibration. [Lilly advises against counting clicks](https://medical.lilly.com/es/products/answers/se-deben-contar-los-clics-al-marcar-una-dosis-de-mounjaro-tirzepatida-kwikpen-315965) and describes the pen as designed for fixed doses; the application's click arithmetic does not validate pen operation.
- Product amounts and residual-medicine guidance are based on the [15 mg KwikPen product information](https://www.medicines.org.uk/emc/product/15486/smpc) and [patient leaflet](https://www.medicines.org.uk/emc/product/15486/pil), checked 2026-11-13. The user's local product information may differ.
- No account or personal-information storage is needed for calculation. A network connection is not needed for the calculation itself.
