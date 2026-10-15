import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("dist");
for (const route of [
  "index.html",
  "payments/index.html",
  "dq/index.html",
  "confirmation/index.html",
]) {
  const html = await readFile(path.join(output, route), "utf8");
  for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(?:https?:|#|mailto:|tel:)/.test(url)) continue;
    const target = url.split("#")[0].split("?")[0];
    if (!target) continue;
    let file = target.startsWith("/")
      ? path.join(output, target)
      : path.resolve(output, path.dirname(route), target);
    if (target.endsWith("/")) file = path.join(file, "index.html");
    await access(file);
  }
  assert(
    !/paper-asset:\/\/|file:\/\/|\/tmp\//.test(html),
    `${route}: temporary asset reference`,
  );
  assert(html.includes("1492938548437853"), `${route}: Meta Pixel must remain`);
}
for (const route of ["index.html", "payments/index.html"]) {
  const html = await readFile(path.join(output, route), "utf8");
  assert.equal(
    (html.match(/<main\b/g) || []).length,
    1,
    `${route}: single responsive page`,
  );
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `${route}: page heading`,
  );
  assert(
    html.includes("data-open-form") &&
      html.includes("apptics-form-modal") &&
      html.includes("apptics-form.bundle.js"),
    `${route}: conversion integration`,
  );
  assert(
    html.includes("analytics.bundle.js") && html.includes("clarity"),
    `${route}: tracking integration`,
  );
}
const payments = await readFile(
  path.join(output, "payments/index.html"),
  "utf8",
);
assert.equal(
  (payments.match(/<details\b/g) || []).length,
  7,
  "seven native FAQ accordions",
);
assert.equal(
  (payments.match(/<summary\b/g) || []).length,
  7,
  "every FAQ has a keyboard control",
);
assert.equal(
  (payments.match(/role="columnheader"/g) || []).length,
  4,
  "four comparison columns",
);
assert.equal(
  (payments.match(/title="(?:Mohammed|Saamir|Lauren) testimonial"/g) || []).length,
  3,
  "three testimonial players",
);
for (const mediaId of ["l1vze0mt9p", "7u4p5xwk9m", "3rn9dtcael"]) {
  assert(
    payments.includes(`https://fast.wistia.net/embed/iframe/${mediaId}?endVideoBehavior=loop`),
    `${mediaId}: direct testimonial embed with looping`,
  );
}
assert.equal(
  (payments.match(/role="rowheader"/g) || []).length,
  9,
  "nine comparison features",
);
console.log(
  "Static route, asset, conversion, tracking, FAQ, video and comparison checks passed.",
);
