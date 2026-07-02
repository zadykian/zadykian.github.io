# Minimal image that renders index.html to a PDF with headless Chromium.
#
#   docker build -t zadykian-cv-pdf .
#   docker run --rm -v "$PWD/docs:/app/docs" zadykian-cv-pdf
#
# The PDF is written to the mounted ./docs/zadykian-cv.pdf on the host.
FROM node:20-slim

# System Chromium + fonts. Puppeteer drives this instead of downloading its own
# browser (smaller image, and it keeps working on arm64 hosts).
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        chromium fonts-liberation ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_DOWNLOAD=1 \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY index.html ./
COPY scripts ./scripts
RUN mkdir -p docs

CMD ["node", "scripts/build-pdf.mjs"]
