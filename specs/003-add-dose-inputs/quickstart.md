# Quickstart and Validation: Add Dose Inputs

These commands describe the planned application after implementation; the files and scripts do not yet exist.

## Prerequisites and setup

Install Node.js 22 or later, Ruby 3.3 and Bundler. GitHub Pages Jekyll/Liquid is incompatible with Ruby 4; Ruby 3.3 local preview remains to be verified. From the repository root, install the project's GitHub Pages-compatible Jekyll dependencies:

```sh
bundle install
```

## Unit tests

```sh
node --test
```

All calculation and validation tests should pass, including single-field and summed inputs, malformed and mixed valid/invalid inputs, comma decimals, whole-number counts, exact one-dose boundaries, over-limit totals before rounding, ties, approximation indicators and nonzero values below display precision. See [data-model.md](data-model.md).

## Local site and browser checks

```sh
bundle exec jekyll serve
```

Open the URL reported by Jekyll. Exercise each field separately and in combination against [the UI contract](contracts/ui.md); confirm 1 mg + 0.1 ml gives 3.5 mg and 0.14 ml and 10 mg + 0.3 ml is rejected. Verify edits clear or update stale results. Inspect the disclaimer and click limitation on mobile and desktop, test keyboard navigation and ensure no horizontal scrolling.

Validate a project-site base path with:

```sh
bundle exec jekyll serve --baseurl /penculator
```

Open the URL including `/penculator/`; verify styles, scripts, calculations and links work. Follow the final README for actual GitHub Pages source configuration and deployment verification. No public deployment is performed by these checks.
