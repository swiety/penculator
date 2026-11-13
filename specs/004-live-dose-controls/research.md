# Research: Live Dose Controls

## Accessible adjustment controls

**Decision**: Retain labelled text inputs and add adjacent, keyboard-focusable `type="button"` decrease and increase buttons with accessible names containing direction and field. Associate feedback with inputs, keep visible focus, and announce result changes politely without moving focus.

**Rationale**: Separate native buttons preserve ordinary keyboard and assistive-technology interaction without implementing a custom ARIA spinbutton. The [W3C quantity spinbutton example](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/examples/quantity-spinbutton/) illustrates the additional value and keyboard semantics required by a spinbutton and cautions that assistive-technology support must be tested.

**Alternatives considered**: A custom spinbutton requires maintaining ARIA value and keyboard semantics. Relying only on browser number-input steppers can lose consistent comma-decimal entry and the specified empty and fractional-offset behavior.

## Live calculation events

**Decision**: Use the existing form's input updates to trigger one shared recalculation function. After a button changes a value programmatically, explicitly invoke the same function; suppress accidental form submission.

**Rationale**: The [`input` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event) covers user-driven changes, but programmatic assignments do not themselves fire it. This covers typing and paste without requiring focus loss or an explicit action.

**Alternatives considered**: A change/blur-only handler does not meet immediate-update requirements; separate calculation logic for buttons risks inconsistent behavior.

## Decimal stepping and validation

**Decision**: Preserve text inputs with `inputmode` hints, reuse consistent non-negative decimal/count parsing rules, and implement exact decimal addition/subtraction with integer arithmetic. The stepping helper must preserve invalid text and never snap valid fractional offsets to a step grid.

**Rationale**: The [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode) suggests a keyboard but does not validate input. Exact decimal arithmetic avoids binary floating-point drift in repeated 0.1 ml steps and maintains existing pre-rounding dose-limit checks.

**Alternatives considered**: Native floating-point increments can produce visible artifacts or incorrect boundary behavior; rounding field values to a step grid would alter user-entered fractional offsets.

## Validation environment

**Decision**: Run Node unit tests and real-browser desktop/mobile and keyboard checks, documenting any unverified checks. Follow the existing README for the local Jekyll/Ruby compatibility limitation.

**Rationale**: Pure arithmetic and simulated form tests cannot establish actual browser layout, keyboard focus or assistive-technology behavior.

**Alternatives considered**: Treating simulated DOM tests as browser verification would leave accessibility and responsive-layout requirements unproven.
