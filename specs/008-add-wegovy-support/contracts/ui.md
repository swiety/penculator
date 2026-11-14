# User Interface Contract

- Selector presents unique, unambiguous brand, device, labelled dose and total contents; selection changes update selected product context, labelled dose count, warnings and leaflet.
- Calculation accepts mg, ml and integer fortieths; click input is enabled solely for original 15 mg Mounjaro and remains explicitly unverified. Unsupported clicks and their step controls are disabled, cleared on switch and explained.
- Display selected-product equivalent mg and ml, units and approximation where rounding occurs. Present invalid, all-zero, too-small or over-limit input as a localized error without a stale valid result.
- Preserve decimal point/comma support, live edits, language changes and phone/desktop layout. Unsupported identifiers cannot silently select a different pen.
- Product safety and leaflet context must follow selection; outputs are mathematical conversions, not advice, fractional deliverability claims or usage instructions.
