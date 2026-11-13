# UI Contract: Live Dose Controls

## Inputs and controls

The existing four text fields remain directly editable and retain their numeric input modes and labels. Each has individually focusable, non-submit decrease and increase buttons with accessible names including the field and direction. Pointer, touch, and keyboard activation change only that field by the specified step: 1 mg, 0.1 ml, one click or one fortieth. No "Calculate total" button is present.

`input` changes, including paste and clearing, invoke the same live calculation path. Explicit control activation also invokes it after a successful step; no form submission or blur is required. Prevent accidental implicit form submission from navigating or resetting the page.

## State and feedback

The empty initial or fully cleared form has no result and no error. Valid current values immediately display mg and ml; 1 mg plus 0.1 ml yields 3.5 mg and 0.14 ml. Invalid or zero-only input, precision failure, or an exact sum above 15 mg / 0.6 ml hides any previous result and shows an associated corrective message. After correction, clear the error and show the current result automatically. Announce changes accessibly without moving focus; avoid repeatedly interrupting screen-reader users while typing.

Stepping an empty field up inserts one step and stepping it down leaves it empty; down at zero stays zero. Preserve fractional offsets (0.15 ml + 0.1 ml = 0.25 ml). Clamp a decrement below zero to zero. Do not overwrite invalid field text when stepping. An over-limit step remains in the input and shows an error so the user can step down to recover. Refer to [data-model.md](../data-model.md) for the complete state rules.

The existing product identity, four fixed doses, patient leaflet, warning about the unverified click assumption, fractional-delivery limitation and bottom-of-page non-medical disclaimer remain present. Controls and messages must be usable without horizontal scrolling on phone and desktop.
