# zadykian.dev

Single-page CV, served at **[zadykian.dev](https://zadykian.dev)** via GitHub Pages.

Self-contained `index.html` (inline CSS/JS, JetBrains Mono) with a light/dark theme toggle that follows the OS preference by default, and a print stylesheet tuned for PDF export.

## PDF

The downloadable CV (`docs/zadykian-cv.pdf`) is rendered from `index.html` with headless Chrome. Either:

```sh
./build-pdf          # in a container — no local Node needed (Docker)
npm run build:pdf    # locally (Puppeteer downloads its own Chromium)
```

writes `docs/zadykian-cv.pdf`. A GitHub Actions workflow (`.github/workflows/build-pdf.yml`) regenerates and commits it whenever `index.html` changes on `main`.

## Layout

```
index.html                      # the CV: markup, styles, theme toggle
favicon.svg
docs/                           # generated CV PDF + supporting documents
scripts/build-pdf.mjs           # Puppeteer renderer
Dockerfile / build-pdf          # containerised PDF build
.github/workflows/build-pdf.yml # auto-regenerates the PDF
```
