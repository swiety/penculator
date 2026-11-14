# Feature Specification: Share Link Label

**Feature Branch**: Not created

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "Niepotrzebnie wyświetlasz pełnego linka z anchorem, zamiast tekstu ‘Anyone with this link can see the pen and target: http://127.0.0.1:4000/#settings?pen=mounjaro-15&target=15’ wolałbym HTMLa postaci ‘Share this link with preselected pen type and target value’, gdzie słowo ‘link’ jest odnośnikiem."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Share settings through a concise link (Priority: P1)

A user sees a short sentence with a clickable word that represents the link to the current pen and target, and can follow or copy the link through the browser.

**Why this priority**: It makes the sharing instruction readable without displaying a long address.

**Independent Test**: Select a pen and valid target, verify the sentence and clickable word, then open or copy the link and confirm it retains those settings.

**Acceptance Scenarios**:

1. **Given** the interface is in English and the settings are valid, **When** the sharing instruction appears, **Then** it reads “Share this link with preselected pen type and target value”, with only “link” as the clickable link and no full address in the sentence.
2. **Given** a valid link, **When** the user copies its address through the browser and opens it, **Then** the exact selected pen presentation and target are restored.
3. **Given** the user changes to another pen or enters a valid target, **When** the settings change, **Then** the link destination immediately represents the new settings while its visible label remains concise.
4. **Given** the interface is in Polish, **When** the sharing instruction appears, **Then** it reads “Udostępnij ten link z wybranym rodzajem pena i zamierzoną dawką”, with only “link” clickable.

### User Story 2 - Avoid a stale link (Priority: P2)

A user editing an invalid target does not see a misleading link to earlier settings and can use the link again after correcting the target.

**Why this priority**: The shorter label must not disguise an outdated destination.

**Independent Test**: Clear a valid target, verify the instruction and link are unavailable, then enter a valid target and verify the restored link's destination.

**Acceptance Scenarios**:

1. **Given** a valid sharing instruction, **When** the target becomes empty, zero, negative or malformed, **Then** the sharing sentence and actionable link are hidden and no previous destination is presented as current.
2. **Given** an invalid target, **When** the user corrects it, **Then** the localized sentence returns with a link to the corrected settings.
3. **Given** a visible sharing instruction, **When** the user changes language, **Then** the sentence and link label use the selected language without changing the settings or link destination.

### Edge Cases

- A link opened from a non-root deployment path must retain that path and restore the same exact pen and target.
- Pens with the same labelled dose but different presentations must remain distinguishable in the link destination.
- The link label must remain usable with keyboard navigation and assistive technology; the surrounding sentence supplies its purpose.
- A previously generated valid settings link must continue to restore settings after this display change.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: For valid settings, display the English sentence “Share this link with preselected pen type and target value”, with “link” as the clickable link. Do not display the full destination address as the link label or as visible sentence text.
- **FR-002**: For valid settings, display the Polish sentence “Udostępnij ten link z wybranym rodzajem pena i zamierzoną dawką”, with “link” as the clickable link. Language changes must update the sentence without changing the destination or settings.
- **FR-003**: The link must remain a standard, keyboard-accessible link whose destination identifies the exact current pen presentation and valid target and can be followed or copied with normal browser actions.
- **FR-004**: Update the destination immediately after a valid pen or target change; opening it must restore the correct pair, including under a non-root deployment path, following the existing feature 009 link contract.
- **FR-005**: When the target is invalid, hide the entire sharing sentence and link, remove or disable any previous actionable destination, and restore the localized sentence and current link when the target becomes valid.
- **FR-006**: Preserve existing pen selection, target validation, calculations, error feedback, safety context and interpretation of previously generated settings links. This feature changes the sharing instruction's presentation only.

### Key Entities *(include if feature involves data)*

- **Sharing instruction**: Localized sentence containing a concise link label and a destination derived from the current valid pen and target.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance testing, 100% of valid English and Polish states show the specified localized sentence with only the word “link” clickable and no full address displayed.
- **SC-002**: In acceptance testing, 100% of tested pen and target changes produce a link that restores the exact current pair, including ambiguous pen strengths and a non-root path.
- **SC-003**: All tested invalid-target transitions hide the sharing sentence and do not expose a stale actionable link; correcting each target restores the current link.
- **SC-004**: In a keyboard and screen-reader check in both languages, participants can identify and activate the sharing link from its sentence without assistance.

## Assumptions

- This feature builds on [Target Dose and Shareable Link](../009-target-dose-link/spec.md) and changes its requirement to show the visible destination: the full address remains the link destination and can be copied through the browser, but is not displayed as sentence text.
- A separate copy button, changes to the settings-fragment format and automatic browser-address updates are outside scope.
- The Polish sentence is a natural translation of the requested English wording. A user's link still reveals the selected pen and target to its recipients, as described in the existing feature documentation.
