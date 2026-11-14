# Penculator

A static calculator for adding pen amounts expressed in mg, ml, clicks and fortieths of a millilitre. Results are mathematical conversions, not dosing advice. The 60-click relationship is an unverified assumption; the manufacturer advises against counting clicks to select a dose. This application is not intended for medical purposes.

## Using the calculator

Enter one or more amounts; the combined total updates automatically. Use the plus and minus controls to adjust each field. Values in the fields are added together.

Choose **English** or **Polski** using the language selector. The first visit uses the browser’s language preferences; an explicit choice is remembered in this browser when storage is available.

## Development

Install Node.js 22 or later, Ruby 3.3 and Bundler. The GitHub Pages Jekyll/Liquid versions are not compatible with Ruby 4; use Ruby 3.3 for the standard local commands below. From the repository root:

```sh
bundle install
node --test
bundle exec jekyll serve
```

Open the address printed by Jekyll. To verify a GitHub Pages project-site base path, run:

```sh
bundle exec jekyll serve --baseurl /penculator
```

Open the address with `/penculator/` appended. The calculation runs in the browser without an account, personal-data storage or a calculation service.

## GitHub Pages

In the repository's Pages settings, choose a supported publishing source. For branch publishing, select the branch containing the site and the repository root, and save the settings. GitHub Pages builds the Jekyll site; the theme and assets use base-path-aware links. Alternatively use a GitHub Pages Actions workflow. Enabling publishing is a separate step. See [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

See `specs/003-add-dose-inputs/quickstart.md` for the full validation checklist.
