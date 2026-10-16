const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const bannerReference = "/assets/mega-blockbuster-banner.jpg?v=1";
const retiredBannerUrl =
  "https://cdn.shopify.com/s/files/1/0786/1610/1096/files/1.webp?v=1774803568";

function readJpegDimensions(buffer) {
  assert.equal(buffer.readUInt16BE(0), 0xffd8, "banner must be a JPEG");

  const startOfFrameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
    0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
  ]);
  let offset = 2;

  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd9 || marker === 0xda) break;

    const segmentLength = buffer.readUInt16BE(offset);
    if (startOfFrameMarkers.has(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }
    offset += segmentLength;
  }

  throw new Error("JPEG dimensions were not found");
}

test("home bundles use the new local hero and remove the old banner", () => {
  for (const bundlePath of [
    path.join(root, "index-MzB9xETE.js"),
    path.join(root, "assets", "index-MzB9xETE.js"),
  ]) {
    const bundle = fs.readFileSync(bundlePath, "utf8");
    assert.match(bundle, new RegExp(bannerReference.replace(/[.?]/g, "\\$&")));
    assert.doesNotMatch(bundle, new RegExp(retiredBannerUrl.replace(/[.?]/g, "\\$&")));
  }
});

test("hero banner is a full-HD-width asset in the old banner ratio", () => {
  const banner = fs.readFileSync(
    path.join(root, "assets", "mega-blockbuster-banner.jpg"),
  );

  assert.deepEqual(readJpegDimensions(banner), { width: 1920, height: 1030 });
  assert.ok(banner.length > 300_000, "banner should retain high-resolution detail");
});

test("the page cache-busts the updated home bundle", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(html, /index-MzB9xETE\.js\?v=14/);
});
