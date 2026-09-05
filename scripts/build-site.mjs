import { cpSync, mkdirSync, rmSync } from "node:fs";

const outputDirectory = new URL("../dist/", import.meta.url);
const projectRoot = new URL("../", import.meta.url);
const deployFiles = [
  "index.html",
  "styles.css",
  "design.css",
  "script.js",
  "assets",
  "dq",
  "confirmation",
];

rmSync(outputDirectory, { recursive: true, force: true });
mkdirSync(outputDirectory, { recursive: true });

for (const file of deployFiles) {
  cpSync(new URL(file, projectRoot), new URL(file, outputDirectory), {
    recursive: true,
  });
}

console.log("Buzz-ready static site built in dist/");
