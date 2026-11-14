# Feature Specification: Add Wegovy Support

**Feature Branch**: Not created

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "add Wegovy too"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select a Wegovy pen (Priority: P1)

A user selects the Wegovy FlexTouch presentation matching their packaging and converts amounts using its properties.

**Why this priority**: Selection and conversion are the purpose of this feature.

**Independent Test**: Select each presentation in FR-001, enter its labelled dose and verify the equivalent volume in FR-003.

**Acceptance Scenarios**:

1. **Given** the selector, **When** the user looks for Wegovy, **Then** all six presentations are identifiable by product, labelled dose, total mg and ml, and four labelled doses.
2. **Given** a 0.5 mg FlexTouch containing 2 mg in 1.5 ml, **When** the user enters 0.5 mg, **Then** the mathematical equivalent is 0.375 ml; for the 2 mg in 3 ml presentation, it is 0.75 ml.
3. **Given** a Wegovy presentation, **When** the user enters mixed amounts in mg, ml or fortieths of a millilitre, **Then** the calculator adds them using that presentation's conversion ratio and displays the result with units.

### User Story 2 - Change pens and understand limits (Priority: P2)

A user switching to Wegovy can identify the selected presentation and its limitations without confusing it with a previous pen.

**Why this priority**: Stale values or a mismatched pen can lead to misleading conversions.

**Independent Test**: Enter a click value and an amount on the existing 15 mg Mounjaro selection, then switch to Wegovy and inspect the result, inputs, warnings and leaflet.

**Acceptance Scenarios**:

1. **Given** a prior result and click input, **When** Wegovy is selected, **Then** the click input is cleared and disabled with an explanation, and the result is cleared or recalculated without it.
2. **Given** retained input exceeds the selected Wegovy labelled dose, **When** the selection changes, **Then** no valid result is displayed and the new limit is explained.
3. **Given** a Wegovy result, **When** the user reviews its context, **Then** the selected product, mathematical nature of the result, fractional-delivery limitation and Wegovy patient information are visible or accessible.

### Edge Cases

- Both 0.5 mg FlexTouch presentations contain 2 mg, but differ in total volume and concentration; selecting solely by dose or total mg is insufficient.
- Unsupported single-dose pens, syringes and unidentified presentations must not be treated as equivalent to a FlexTouch pen with the same dose.
- Empty, malformed, negative, all-zero, over-limit and too-small-to-display inputs follow existing validation and precision rules against the selected presentation.
- Changes to product, language or input must not leave a stale result, warning or leaflet associated with another pen.
- Four labelled doses do not imply residual liquid is an additional dose.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Support the following EU Wegovy FlexTouch multi-dose presentations, each containing four labelled doses: 0.25 mg dose, 1 mg in 1.5 ml; 0.5 mg dose, 2 mg in 1.5 ml; 0.5 mg dose, 2 mg in 3 ml; 1 mg dose, 4 mg in 3 ml; 1.7 mg dose, 6.8 mg in 3 ml; and 2.4 mg dose, 9.6 mg in 3 ml.
- **FR-002**: Let users identify and select each presentation by brand, FlexTouch device, labelled dose, total contents in mg and ml and number of labelled doses. Identify the active ingredient as semaglutide.
- **FR-003**: For Wegovy conversions, use the ratio of labelled total contents in mg to total volume in ml as a mathematical assumption. For the six presentations in FR-001, the resulting equivalents for one labelled dose are respectively 0.375, 0.375, 0.75, 0.75, 0.75 and 0.75 ml. Identify these as calculated equivalents, not manufacturer-stated delivered volumes or instructions.
- **FR-004**: Convert and add existing mg, ml and fortieths-of-a-millilitre inputs using the selected presentation's ratio; require a total greater than zero and no greater than one labelled dose and state the selected limit on error. Preserve existing input formats, precision, rounding, approximation labels and live controls.
- **FR-005**: Disable click input for every Wegovy presentation, explain that its click conversion is unavailable, and clear previous click input when switching to Wegovy. Do not present clicks as pen-use instructions.
- **FR-006**: On selection changes, immediately update product information, warnings and leaflet; clear or recalculate the result and revalidate retained inputs against the selected pen.
- **FR-007**: Provide access to the Wegovy manufacturer patient information and remind users to check their own packaging and leaflet. State that remaining solution after four labelled FlexTouch doses is insufficient for another dose.
- **FR-008**: Retain visible mathematical-conversion, non-medical-use and fractional-deliverability limitations. Do not recommend doses or imply the pen can deliver a calculated fraction.
- **FR-009**: Provide selection, product information, errors and safety context in English and Polish, retaining phone and desktop usability. Preserve supported existing pen behavior and the requirements of [Expand Pen Support](../007-expand-pen-support/spec.md) when that feature is implemented.

### Key Entities *(include if feature involves data)*

- **Pen presentation**: Brand, device, active ingredient, labelled dose, total contents, labelled dose count and relevant patient information.
- **Calculation**: Selected presentation, entered amounts, mathematically equivalent total in mg and ml and approximation status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All six Wegovy presentations can be uniquely selected and display correct identifying information in acceptance testing.
- **SC-002**: For every presentation, 100% of tested labelled-dose, fractional, mixed-input, rounding and boundary cases yield the correct mathematical equivalent or required error; both 0.5 mg presentations yield distinct labelled-dose equivalents.
- **SC-003**: In all tested changes to Wegovy, no result, click input, leaflet or warning is incorrectly associated with the previous presentation.
- **SC-004**: At least 90% of first-time participants can select a matching Wegovy presentation from its label and identify a conversion and units within 60 seconds in each supported language.

## Assumptions

- Following the preceding feature's scope, this feature covers EU-labelled multi-dose FlexTouch pens only. Single-dose pens, including 7.2 mg, syringes, other markets and custom concentrations are excluded. Not all presentations may be marketed in every country.
- Wegovy product information specifies total contents and four doses but does not state an exact volume per dose for these pens. Dividing total volume by total mass is a transparent mathematical assumption; it does not establish delivered volume or pen capability.
- The existing 15 mg Mounjaro default remains unchanged. Feature 007 specifies additional Mounjaro and Ozempic support and is a dependency for preserving that broader selection if implemented before or alongside this feature.
- Product details are based on [EMA Wegovy product information](https://www.ema.europa.eu/en/documents/product-information/wegovy-epar-product-information_en.pdf), sections 2 and 6.5, checked 2026-11-14. Local labels and availability may differ.
