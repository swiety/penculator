# Research: Compact Calculator Layout

## Field layout and vertical space

**Decision**: Use a two-column amount grid where it remains readable, including the 390-pixel target, with a single-column fallback at narrower widths or enlarged text. Reduce top spacing, card padding, divider margins and repeated heading copy; preserve all required guidance and warnings. Measure actual rendered output before finalizing dimensions.

**Rationale**: The current 480-pixel breakpoint turns four fields into four rows, and the separate button row increases each field's height. Page and card padding and repeated introductory headings also consume vertical space. Reflow is preferable to clipping when space becomes constrained. [W3C reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

**Alternatives considered**: Keep the four stacked rows and only shrink typography (insufficient space and harms readability); hide warnings or results behind a disclosure (conflicts with the spec); use a fixed/sticky result overlay (risks covering controls and content on short screens).

## Adjustment controls

**Decision**: Place independently operable increase and decrease buttons at the input's right edge as a vertical group when it fits, reserving space for the input value and unit. Each button should contain a 24 × 24 CSS-pixel target at minimum, with larger targets where possible; two stacked targets therefore need at least 48 CSS pixels of vertical space. Avoid fixed vertical offsets that break when text wraps. Retain existing accessible names and event semantics.

**Rationale**: This removes the separate control row while preserving direct manipulation. A small visible icon need not imply a small target. The minimum target size and spacing exceptions are described in [W3C target size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html); a minimum is not proof of comfortable touch use, so actual interaction checks remain necessary.

**Alternatives considered**: Smaller unspaced icons (difficult to target); browser-native number spinners (can change decimal input and stepping semantics); separate full-size buttons below every field (preserves the excessive height).

## Validation approach

**Decision**: Retain the Node regression suite and verify the built page in a real browser using actual viewport geometry, keyboard navigation, touch-capable interaction, text enlargement and invalid/result states. Measure the full page including its theme header. Include a first-time-user exercise for the spec's qualitative target.

**Rationale**: The existing Node tests do not render CSS, establish real target geometry or demonstrate touch usability. No browser-testing dependency is currently present, and none is needed merely to plan the feature.

**Alternatives considered**: Inferring fit from styles or unit tests alone (cannot establish actual rendering); forcing all content into the viewport at every size (would sacrifice readability and warnings).
