# Research: Pen Presentation Support

## Source and identities

**Decision**: Use EU-labelled product information and distinguish pens by brand, device, dose and total contents. **Rationale**: Dose alone does not determine concentration; the two 0.5 mg Wegovy and multiple Ozempic pens differ. **Alternatives**: Dose-only selection rejected as ambiguous. Sources: [EMA Mounjaro](https://www.ema.europa.eu/en/documents/product-information/mounjaro-epar-product-information_en.pdf), [EMA Ozempic](https://www.ema.europa.eu/en/documents/product-information/ozempic-epar-product-information_en.pdf), [EMA Wegovy](https://www.ema.europa.eu/en/documents/product-information/wegovy-epar-product-information_en.pdf#page=3).

## Conversion and precision

**Decision**: Use exact rational representations with presentation-specific basis: Mounjaro and Ozempic labelled dose/volume per spec 007; Wegovy total contents/volume per spec 008. Preserve four-decimal half-up output, approximation and zero-rounding rejection. **Rationale**: Fractional strengths cannot be passed directly to BigInt; rounded Ozempic dose volumes and Wegovy total-content ratios are intentionally different rules. Wegovy equivalents are inferred from totals and not a statement of delivered volume. **Alternatives**: Float arithmetic, rounded mg/ml values and one universal rule rejected due to precision and cross-product inconsistencies.

## User context and sequencing

**Decision**: Implement feature 007 foundation first, then feature 008 data and context; keep click conversion only for original Mounjaro 15 mg. **Rationale**: Neither feature is implemented yet; Wegovy and new presentations have no verified click ratio. **Alternatives**: Duplicate separate calculator implementations or assume 007 already exists rejected. Manufacturer warns against counting clicks; consult the relevant product leaflet. Remaining Wegovy FlexTouch solution after four doses is insufficient for another dose (EMA section 6.6). No unresolved technical clarifications remain.
