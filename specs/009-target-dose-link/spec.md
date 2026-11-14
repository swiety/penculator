# Feature Specification: Target Dose and Shareable Link

**Feature Branch**: Not created

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "Dodaj jeszcze osobny input przy wyborze Pena, jaka jest zamierzona dawka mg. Domyślnie powinna się ustawiać pojedyncza dawka danego pena (tj. dla Mounjaro 15mg zamierzona dawka powinna być 15mg), ale użytkownik powinien mieć możliwość ją zwiększyć lub zmniejszyć (wpisując wartość lub widżetami +/-). Wyświetl też anchora z linkiem do strony z ustawionymi parametrami (typ pena + zamierzona dawka) i dostosuj aplikację aby przy załadowaniu URLa z takim anchorem automatycznie ustawiały się te wartości."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Set a target amount (Priority: P1)

A user selects a pen and sets an intended amount in mg in a separate field next to the pen selection, either by typing or using plus and minus controls.

**Why this priority**: A clearly visible and adjustable target is the central setting requested.

**Independent Test**: Select Mounjaro 15 mg, verify the target starts at 15 mg, then type 7.5 mg and adjust it with both controls.

**Acceptance Scenarios**:

1. **Given** the page has no applicable shared settings, **When** Mounjaro 15 mg is selected, **Then** the separate target field displays 15 mg.
2. **Given** a target of 7.5 mg, **When** the user presses plus and then minus, **Then** it changes to 8.5 mg and back to 7.5 mg without changing the calculation amount fields.
3. **Given** a target of 15 mg, **When** the user enters 16 mg, **Then** the target is accepted as a user-entered setting, without a claim that the selected pen can deliver it.
4. **Given** the user changes the selected pen, **When** the selection is made, **Then** the target resets to the new pen's labelled single dose and the shareable link reflects both values.

### User Story 2 - Share and restore settings (Priority: P1)

A user can follow or copy a visible link containing the selected pen presentation and target in the URL fragment and restore those settings on opening it.

**Why this priority**: The link makes the same configuration reproducible without re-entering it.

**Independent Test**: Select an Ozempic presentation, set 0.5 mg, copy the visible link, open it in a fresh page and verify the same exact presentation and target.

**Acceptance Scenarios**:

1. **Given** valid settings, **When** the user changes pen or target, **Then** the visible link immediately identifies the current pen and target using a URL fragment and can be followed or copied.
2. **Given** a link generated for an Ozempic 0.5 mg, 2 mg/3 ml pen and target 0.25 mg, **When** the link is opened, **Then** that exact presentation and 0.25 mg are restored, rather than another 0.5 mg pen.
3. **Given** a valid link with a target different from the pen's default, **When** the page loads, **Then** the linked target takes precedence over the default; changing the pen afterwards resets it as in story 1.
4. **Given** the app is hosted under a subpath, **When** a link is generated and opened, **Then** it retains that page's origin and path and restores the same settings.

### User Story 3 - Recover from invalid input or link (Priority: P2)

A user gets clear feedback when a target or shared link cannot be interpreted, without a misleading link to stale settings.

**Why this priority**: Edited and shared values may be incomplete, malformed or refer to an unsupported pen.

**Independent Test**: Enter an invalid target after a valid target, then open a link with an unknown pen identifier, and verify feedback and recovery.

**Acceptance Scenarios**:

1. **Given** a valid target and link, **When** the target is cleared, zero, negative, malformed or incomplete, **Then** the text remains editable, an explanation is shown and no usable link representing the previous target is displayed.
2. **Given** invalid target text, **When** plus or minus is activated, **Then** the text remains unchanged and the user is asked to correct it; after correction the current link returns.
3. **Given** a fragment with an unknown pen, invalid dose, missing value, duplicated parameter or malformed encoding, **When** the page loads, **Then** neither supplied setting is applied, the default pen and its single-dose target are shown, and a visible message explains the link could not be restored.
4. **Given** a page without a settings fragment, **When** it loads, **Then** the usual default pen and its single-dose target appear without a link error.

### Edge Cases

- Decimal points and commas are accepted in direct entry. A partial decimal such as `1,` is invalid until completed; a valid shared link restores the same numerical value in either language.
- Target values are strictly positive; there is no upper limit tied to the pen's labelled single dose. The controls must not silently clamp a positive value to zero or a labelled-dose maximum.
- Plus and minus change the current value by exactly 1 mg, preserving fractional offsets; if subtraction would reach zero or a negative value, leave the value unchanged and explain the positive lower boundary.
- A link with only one of the two settings, repeated keys, non-numeric or non-positive target, or an unknown presentation is invalid as a whole. An unrelated URL fragment is not interpreted as pen settings and does not produce a settings error.
- Invalid edits must never leave a previously valid target link visible as if it represented current text. A pen change resets the target even after invalid input.
- Loading a link must not populate, clear or reinterpret the existing calculation amount fields, nor persist those fields in the link.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Display an independently labelled target amount field in mg adjacent to the pen selection. On an ordinary initial load, set it to the selected pen's labelled single dose; on each subsequent pen selection, reset it to that pen's labelled single dose.
- **FR-002**: Allow a user to enter a strictly positive decimal target using a point or comma, including values larger than the pen's labelled single dose; reject empty, zero, negative, malformed and incomplete values with a localized explanation. Do not impose a pen-dose upper limit on this setting.
- **FR-003**: Provide individually labelled plus and minus controls, operable by keyboard, touch and pointer, that adjust a valid target by exactly 1 mg while retaining any fractional offset. If decrementing would produce zero or a negative value, retain the current positive value and explain the limit. Invalid text must remain unchanged when either control is used.
- **FR-004**: Show a usable anchor linking to the current page with a URL fragment encoding the exact selected presentation and valid target amount. Update its visible destination and target on every valid change. The link must remain correct under a non-root deployment path and distinguish presentations that share a labelled dose.
- **FR-005**: On page load, restore both pen and target from a valid settings fragment before displaying the final state, with the linked target taking precedence over the usual selected-pen default. Restored values must produce an equivalent shareable link.
- **FR-006**: Treat a settings fragment as an atomic pair: unknown or missing pen, missing or invalid target, duplicate settings or malformed encoding must apply neither value, show the normal default pen and target, and display a localized explanation. An absent or unrelated fragment must use defaults without a link error.
- **FR-007**: Hide or disable the usable shareable link while the target field is invalid; never expose a link to a previous target as the current configuration. Restore it automatically when valid input returns.
- **FR-008**: Keep the target separate from the existing additive calculation inputs. Changing or restoring the target must not change their values, sum, conversion, one-labelled-dose calculation limit, result or warnings. The link must contain only the selected pen and target, not calculation inputs or language preference.
- **FR-009**: Preserve existing presentation-specific details, safety limitations and patient information. Make clear that the target is a user-entered mathematical setting, not a recommended dose or proof of deliverability, including when it exceeds one labelled dose.
- **FR-010**: Provide the new field, controls, link and errors in English and Polish and retain existing phone and desktop accessibility without horizontal scrolling.

### Key Entities *(include if feature involves data)*

- **Selected presentation**: A uniquely identifiable supported pen with a labelled single-dose amount.
- **Target amount**: User-entered strictly positive amount in mg, separate from calculation amounts.
- **Shared settings link**: Link to the current page whose fragment represents exactly one selected presentation and one valid target amount.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance testing, every supported pen initializes the target to its labelled single dose, and 100% of tested typed and stepped valid changes appear in the target and link.
- **SC-002**: In acceptance testing, 100% of generated links for all supported presentations and representative fractional and above-labelled-dose targets restore the exact presentation and numerical target on fresh load, including under a subpath.
- **SC-003**: All tested invalid target and link cases produce the specified feedback without a stale usable settings link or partial restoration; existing calculation regression cases remain unchanged.
- **SC-004**: At least 90% of first-time participants can set a target, locate the link and restore the settings within 60 seconds without help, in each supported language; participants can operate the controls on phone and desktop without horizontal scrolling.

## Assumptions

- The intended amount is a user-supplied setting only. The request does not specify comparison against the calculated total, filling calculation fields, changing their limit or dose recommendations; those behaviors are outside this feature.
- The single-dose default comes from the selected presentation, including Ozempic and Wegovy presentations with the same labelled dose but different total contents. Links refer to the presentation rather than brand and dose alone.
- In line with the existing mg adjustment control, plus/minus uses 1 mg steps; direct decimal entry is not restricted to that grid. Above-labelled-dose targets are permitted because increasing the default was requested.
- The shareable anchor is a conventional clickable link, not an additional clipboard button. A link may reveal the chosen pen and target to anyone with whom the user shares it; it does not include calculation inputs.
- Existing non-medical-use and fractional-delivery warnings remain applicable. No schedule, treatment advice, account or server-side storage is introduced.
