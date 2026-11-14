# Feature Specification: Expand Pen Support

**Feature Branch**: Not created

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "add support to remaining sizes of Mounjaro KwikPens, add also support to Ozempic pens."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select a Mounjaro KwikPen (Priority: P1)

A user selects their Mounjaro KwikPen strength and converts and adds amounts using the existing calculator.

**Why this priority**: This extends the calculator to the remaining strengths.

**Independent Test**: Select each strength, enter its labelled dose in mg and verify that the equivalent is 0.6 ml.

**Acceptance Scenarios**:

1. **Given** the calculator, **When** the user selects a 2.5, 5, 7.5, 10, 12.5 or 15 mg KwikPen, **Then** its strength, four labelled doses and 0.6 ml per dose are shown.
2. **Given** the 5 mg KwikPen, **When** the user enters 2.5 mg, **Then** the result is 0.3 ml, identified as a mathematical equivalent.
3. **Given** the 15 mg KwikPen, **When** the user uses an existing supported input, **Then** existing calculations and warnings remain available.

### User Story 2 - Select an Ozempic pen (Priority: P1)

A user identifies their Ozempic pen by its labelled dose and total contents, then converts and adds amounts using its properties.

**Why this priority**: Pens with the same labelled dose can have different concentrations.

**Independent Test**: Select both 0.5 mg / 3 ml presentations and verify their information and calculated volumes differ as specified below.

**Acceptance Scenarios**:

1. **Given** the selector, **When** the user looks for Ozempic, **Then** all seven presentations in FR-002 are distinguishable by labelled dose and total mg and ml.
2. **Given** Ozempic 0.5 mg, 2 mg in 3 ml, **When** the user enters 0.5 mg, **Then** the result is 0.74 ml; for 0.5 mg, 4 mg in 3 ml, the result is 0.37 ml.
3. **Given** an Ozempic pen, **When** the user sees the calculation, **Then** product-specific information and a leaflet are available, without suggesting that counting clicks selects a dose.

### User Story 3 - Change the selected pen (Priority: P2)

A user changes pens and can tell which product governs the current inputs and result.

**Why this priority**: A stale result or ambiguous presentation can misrepresent a conversion.

**Independent Test**: Enter an amount, switch pens and check the result and validation against the new pen.

**Acceptance Scenarios**:

1. **Given** a result for one pen, **When** the selection changes, **Then** the result is immediately recalculated or cleared and the new pen's information is shown.
2. **Given** retained inputs exceeding the new pen's one-dose limit, **When** the pen changes, **Then** no valid result is displayed and the new limit is explained.
3. **Given** a pen with no supported click conversion is selected, **When** an earlier click input exists, **Then** it is cleared and excluded from the new result and the reason is explained.

### Edge Cases

- Ozempic pens can share a labelled dose while differing in contents and concentration; selection cannot rely on dose alone.
- Empty, malformed, negative, all-zero, over-limit and too-small-to-display inputs retain existing validation and precision rules, using the selected pen's limits.
- Switching product, language or inputs must not leave a stale result, warning or leaflet associated with the wrong selection.
- Rounded results are labelled approximate; Ozempic dose volumes are stated to two decimal places and are the conversion basis, not a claim of exact physical delivery.
- Unsupported or unidentified pens cannot be calculated by assuming another presentation's concentration or click relationship.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Support Mounjaro multi-dose KwikPens with labelled doses of 2.5, 5, 7.5, 10, 12.5 and 15 mg; each has four labelled doses of 0.6 ml.
- **FR-002**: Support these EU Ozempic pre-filled pen presentations, identified by labelled dose, total pen contents, labelled dose volume and dose count: 0.25 mg, 2 mg/1.5 ml, 0.19 ml, four doses; 0.5 mg, 2 mg/1.5 ml, 0.37 ml, four doses; 0.5 mg, 2 mg/3 ml, 0.74 ml, four doses; 0.5 mg, 4 mg/3 ml, 0.37 ml, eight doses; 1 mg, 4 mg/3 ml, 0.74 ml, four doses; 1 mg, 8 mg/3 ml, 0.37 ml, eight doses; and 2 mg, 8 mg/3 ml, 0.74 ml, four doses.
- **FR-003**: Let users select a specific presentation and show its product, active ingredient, labelled dose, dose volume, number of labelled doses and total pen contents, distinguishing presentations that share a dose.
- **FR-004**: Convert and add existing mg, ml and fortieths-of-a-millilitre inputs using the selected presentation's labelled mg-to-ml dose ratio; enforce a total greater than zero and no greater than one labelled dose, with the selected limit in the error. Preserve existing number formats, precision, approximation and live-control behavior.
- **FR-005**: Preserve the existing 60-click assumption only for the 15 mg Mounjaro KwikPen with its existing warnings. Disable click input for every newly supported presentation, explain that its click conversion is unavailable, and clear any previous click input on switching to it.
- **FR-006**: On a pen change, immediately update presentation information, applicable warnings and leaflet, and clear or recalculate the result and revalidate retained inputs using the new selection.
- **FR-007**: Provide the selected product's relevant manufacturer patient information and remind users to check their own packaging and leaflet; do not apply Mounjaro four-dose residual-medicine wording to Ozempic presentations indiscriminately.
- **FR-008**: Retain visible mathematical-conversion, non-medical-use and fractional-deliverability limitations. Do not recommend doses, imply that a fractional result can be delivered, or present click counts as pen-use instructions.
- **FR-009**: Provide selection, product information, errors and safety context in both existing English and Polish interfaces, and preserve existing phone and desktop usability.

### Key Entities *(include if feature involves data)*

- **Pen presentation**: Product, active ingredient, labelled dose and volume, total contents, number of labelled doses, applicable limitations and leaflet.
- **Calculation**: Selected presentation, entered amounts, equivalent total in mg and ml, and approximation status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 13 listed presentations can be uniquely selected and display correct labelled information in acceptance testing.
- **SC-002**: For every presentation, 100% of tested labelled-dose, fractional, mixed-input, rounding and boundary cases produce the expected equivalent or required error; the two 0.5 mg/3 ml Ozempic examples produce distinct results.
- **SC-003**: In all tested selection changes, no result, click input, leaflet or warning remains incorrectly associated with the previous presentation.
- **SC-004**: At least 90% of first-time participants can select a matching presentation from its label and identify a conversion and its units within 60 seconds, in each supported language.

## Assumptions

- Scope is the EU-labelled multi-dose presentations listed above, including presentations that may not be marketed in every country. Other markets, syringes, vials, single-dose pens and custom concentrations are excluded. Users must match their own product label.
- The existing 15 mg KwikPen is the default; adding other pens does not change its established behavior. No personal information or account is required.
- Labelled dose volumes are used consistently as the conversion basis, including rounded Ozempic values; results describe mathematical equivalents rather than actual delivered volume.
- Product information: [EMA Mounjaro product information](https://www.ema.europa.eu/en/documents/product-information/mounjaro-epar-product-information_en.pdf), section 2; [EMA Ozempic product information](https://www.ema.europa.eu/en/documents/product-information/ozempic-epar-product-information_en.pdf), sections 2 and 6.5, checked 2026-11-14. Availability and local labelling may differ.
