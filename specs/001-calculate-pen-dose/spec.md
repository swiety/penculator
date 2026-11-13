# Feature Specification: Calculate Pen Dose

**Feature Branch**: Not created

**Created**: 2026-11-13

**Status**: Draft

**Input**: User description: "Create a very simple webapplication to calculate pen doses, so I can easily calculate Mounjaro pen injections. Let's start with 15mg pen first - it contains 4 doses, each dose is 15mg and 0.6ml."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Convert an amount to a volume (Priority: P1)

A user enters an amount of tirzepatide in milligrams and sees its equivalent volume for the 15 mg Mounjaro KwikPen, along with the product context and limitations needed to interpret the result.

**Why this priority**: The conversion is the core purpose of the application.

**Independent Test**: Enter 15 mg and verify that the result is 0.6 ml, with the pen identity and safety context visible.

**Acceptance Scenarios**:

1. **Given** the calculator is open, **When** the user enters 15 mg and calculates, **Then** it shows 0.6 ml and identifies the 15 mg KwikPen.
2. **Given** the calculator is open, **When** the user enters 7.5 mg and calculates, **Then** it shows 0.3 ml as a mathematical equivalent and explains that this does not establish that the pen can deliver that amount.
3. **Given** a result is displayed, **When** the user changes the amount, **Then** the previous result is cleared or updated so it cannot be mistaken for the new input.

### User Story 2 - Recognize invalid input (Priority: P2)

A user receives a clear explanation when an amount cannot be calculated within the scope of one labelled dose.

**Why this priority**: Invalid or out-of-range input must not produce a misleading result.

**Independent Test**: Submit an empty value, zero, a negative value, text and a value above 15 mg; verify that each produces an actionable message and no result.

**Acceptance Scenarios**:

1. **Given** an empty, non-numeric, zero or negative amount, **When** the user calculates, **Then** no result is shown and the user is asked for a positive amount up to 15 mg.
2. **Given** an amount above 15 mg, **When** the user calculates, **Then** no result is shown and the one-dose limit is explained.

### Edge Cases

- Decimal amounts are accepted with either a decimal point or comma; malformed numbers are rejected.
- Values whose equivalent volume is not exact at the displayed precision are marked as approximate; a positive value must never be displayed as 0 ml.
- A value outside the supported range must not leave an earlier result visible as if it were current.
- The four labelled doses total 60 mg in 2.4 ml; the calculator must not imply that any residual liquid is an additional usable dose.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST identify the supported product as Mounjaro 15 mg KwikPen and display its four labelled doses, each 15 mg in 0.6 ml.
- **FR-002**: The user MUST be able to enter a positive amount in mg, up to and including 15 mg, and request its equivalent volume, subject to the precision limit in FR-004.
- **FR-003**: The application MUST calculate volume using the stated ratio of 15 mg per 0.6 ml and display the input and result with their units.
- **FR-004**: The application MUST display results to at most 4 decimal places in ml, rounding to the nearest last displayed digit; it MUST label rounded results as approximate and reject inputs whose positive volume would round to zero, explaining the precision limit.
- **FR-005**: The application MUST accept decimal points and commas and reject malformed, empty, non-positive and greater-than-15 mg inputs with an explanation and without a result.
- **FR-006**: The application MUST clear or update a displayed result when the input changes and MUST allow another calculation without reloading.
- **FR-007**: The calculation view MUST state that a volume is a mathematical conversion, not a dose recommendation or instructions for operating the pen; the user should follow their prescribed dose and consult a doctor or pharmacist about use.
- **FR-008**: The application MUST state that the pen is labelled for four full doses, that a fractional result does not establish the ability to administer it with the pen, and that residual medicine after the four doses must not be used.
- **FR-009**: The application MUST provide access to the manufacturer's patient leaflet and identify that users should check the information supplied with their own product.
- **FR-010**: The application MUST be usable on both a phone and a desktop without horizontal scrolling for its primary calculation flow.

### Key Entities *(include if feature involves data)*

- **Pen specification**: Product identity, labelled amount and volume per dose, and number of labelled doses.
- **Calculation**: User-entered amount in mg, mathematically equivalent volume in ml, and whether the displayed result is approximate.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance testing, 100% of representative valid inputs, including 15 mg and 7.5 mg and rounding boundaries, yield the mathematically correct labelled result under FR-004.
- **SC-002**: In acceptance testing, 100% of the invalid and out-of-range cases described above produce no result and explain how to correct the input.
- **SC-003**: At least 90% of first-time test users can enter an amount and identify its equivalent volume and units within 30 seconds without assistance.
- **SC-004**: In a usability check on a phone and a desktop, all participants can find the product identity and the safety context before using the displayed result.

## Assumptions

- The initial release supports only the 15 mg Mounjaro KwikPen described above; other strengths, products, dose schedules, injection instructions, click counts, inventory tracking and accounts are outside scope.
- Entering a fractional amount requests a mathematical conversion only; it is not a claim that the pen can measure or deliver that amount.
- Product information is based on the [15 mg KwikPen summary of product characteristics](https://www.medicines.org.uk/emc/product/15486/smpc) and [patient leaflet](https://www.medicines.org.uk/emc/product/15486/pil), checked 2026-11-13. These are UK documents; the user's own packaging and local leaflet may differ.
- Calculations do not require storage of personal or medical information. No external service or account is required for the calculation.
