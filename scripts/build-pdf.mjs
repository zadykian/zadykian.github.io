// Renders index.html to docs/zadykian-cv.pdf with headless Chrome.
// Run locally with `npm run build:pdf`; CI runs the same on every change to index.html.
import puppeteer from "puppeteer";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = pathToFileURL(join(root, "index.html")).href;
const output = join(root, "docs", "zadykian-cv.pdf");

const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
    const page = await browser.newPage();
    await page.goto(input, { waitUntil: "networkidle0" });

    // Force the light theme so the document never inherits an on-screen dark state.
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "light"));

    // page.pdf() renders with print emulation; the @media print block resets colours to light.
    await page.emulateMediaType("print");

    // Make sure the web fonts have finished loading before rendering.
    await page.evaluate(async () => { await document.fonts.ready; });

    await page.pdf({
        path: output,
        format: "A4",
        printBackground: true,
        margin: { top: "14mm", right: "14mm", bottom: "14mm", left: "14mm" },
    });

    console.log(`Wrote ${output}`);
} finally {
    await browser.close();
}
