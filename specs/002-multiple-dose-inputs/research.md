# Research: Multiple Dose Inputs

**Status**: Technical choices recorded; feature behavior remains blocked on spec FR-004.

## Static publishing and theme

**Decision**: Use the GitHub Pages-supported Minima Jekyll theme with focused CSS adjustments for the calculator. Publish the generated static site through GitHub Pages; account for project-site base paths in asset links.

**Rationale**: Minima is a supported Jekyll theme, fits a simple site, and can be customized without a frontend framework. GitHub Pages supports Jekyll sites and describes theme configuration and CSS customization in its [theme documentation](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll).

**Alternatives considered**: A custom theme increases design and maintenance effort. A JavaScript application framework adds a runtime dependency without a demonstrated need. A separate backend is unnecessary for static arithmetic.

## JavaScript unit tests

**Decision**: Use plain JavaScript modules with Node's built-in `node:test` and `node:assert` for calculation and validation tests, run using `node --test`. Node is a development tool, not a deployed service. Supplement unit tests with browser checks of the form and layout.

**Rationale**: The built-in [Node test runner](https://nodejs.org/api/test.html) provides automated tests without an additional test framework. Real browser checks cover page behavior that pure calculation tests cannot.

**Alternatives considered**: Third-party test frameworks add a dependency without a current need; manual checks alone would not provide repeatable calculation regression tests.

## Open product decision

**NEEDS CLARIFICATION**: Whether values in multiple populated fields are added or interpreted as alternative representations of the same amount. This choice changes calculations, validation and acceptance scenarios; technical research cannot decide the user's intended behavior.
