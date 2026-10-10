import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";

import { transformSync } from "esbuild";

const outputDirectory = new URL("../dist/", import.meta.url);
const projectRoot = new URL("../", import.meta.url);
const deployFiles = [
  "index.html",
  "styles.css",
  "design.css",
  "script.js",
  "landing.css",
  "assets",
  "dq",
  "confirmation",
  "payments",
];

rmSync(outputDirectory, { recursive: true, force: true });
mkdirSync(outputDirectory, { recursive: true });

for (const file of deployFiles) {
  cpSync(new URL(file, projectRoot), new URL(file, outputDirectory), {
    recursive: true,
  });
}

// Minify shipped styles without changing the readable source or asset URLs.
for (const file of ["landing.css", "assets/landing/tokens.css"]) {
  const target = new URL(file, outputDirectory);
  const { code } = transformSync(readFileSync(target, "utf8"), {
    loader: "css",
    minify: true,
  });
  writeFileSync(target, code);
}

console.log("Production static site built in dist/");
