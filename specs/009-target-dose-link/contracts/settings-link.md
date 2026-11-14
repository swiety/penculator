# Settings Link and UI Contract

## Fragment format

`#settings?pen=<encoded-presentation-id>&target=<encoded-positive-decimal>`

Example: `https://example.test/penculator/#settings?pen=ozempic-05-2-3&target=0.25`.

- A fragment is recognized only when it starts with `#settings?` or is exactly `#settings`; the latter is recognized but invalid because its pair is missing. Other fragments are unrelated and ignored.
- A recognized fragment requires exactly one `pen` and exactly one `target`, no extra keys, valid percent escapes and UTF-8, an existing catalog ID and a strictly positive complete decimal. Parameter order is immaterial. Duplicate keys, missing values, empty values, bad encoding and unsupported IDs invalidate the entire pair.
- Canonical emitted links contain only `pen` and `target` in that order, with percent-encoded values and point decimal separator. Preserve the current origin, pathname and query; replace any existing fragment. Clicking the anchor or opening it afresh restores the encoded state; opening a recognized invalid link retains or falls back to the initial default pair and shows an error.
- The link does not store calculation inputs or language. The fragment is shareable data and visible to recipients; do not imply it is private.

## UI and state

- Label target in mg beside the pen selection, with accessible individual increase/decrease buttons. Show a localized target-validation error distinct from the calculation error and link-restoration error.
- Target defaults to the selected pen's labelled single dose and resets upon direct pen changes; linked target overrides this default when restoring a valid pair.
- Update the visible anchor text and destination immediately for a valid target. Hide or disable it and remove the old destination for invalid target text.
- Preserve additive fields for target edits and fragment restoration. Preserve results and errors for target-only edits; when fragment restoration changes the pen, revalidate retained fields and recalculate or show an error, including for unsupported retained clicks. Keep existing direct pen-change validation and click handling. Warnings must not suggest the chosen target is medically recommended or deliverable.
- Support English and Polish, keyboard and touch interaction, and layouts without horizontal scrolling on phone or desktop.
