import { test } from "node:test";
import assert from "node:assert/strict";
import {
  localePath,
  switchLocalePath,
  preferredLocale,
  formatDate,
  dictionary,
} from "../../lib/i18n";
import { safeExternalUrl, localized } from "../../lib/types";
test("preserves unprefixed English and Serbian prefixes including project slugs", () => {
  assert.equal(localePath("/", "en"), "/");
  assert.equal(localePath("/", "sr"), "/sr");
  assert.equal(
    switchLocalePath("/sr/projects/existing-slug", "en"),
    "/projects/existing-slug",
  );
  assert.equal(
    switchLocalePath("/projects/existing-slug", "sr"),
    "/sr/projects/existing-slug",
  );
});
test("root browser language detection respects preference ordering and zero quality", () => {
  assert.equal(preferredLocale("sr-RS,sr;q=0.9,en;q=0.8"), "sr");
  assert.equal(preferredLocale("sr;q=0.5,en;q=1"), "en");
  assert.equal(preferredLocale("fr,sr;q=0,en;q=0.8"), "en");
  assert.equal(preferredLocale(null), "en");
});
test("date and translated content remain localized", () => {
  assert.ok(formatDate("November 2022", "en").includes("Nov"));
  assert.ok(formatDate("November 2022", "sr").includes("2022"));
  assert.equal(dictionary("sr").Hello, "Zdravo");
  assert.equal(localized({ en: "Fallback" }, "sr"), "Fallback");
});
test("only HTTP and HTTPS project links are rendered", () => {
  assert.equal(safeExternalUrl("javascript:alert(1)"), undefined);
  assert.equal(safeExternalUrl("data:text/html,<script>"), undefined);
  assert.equal(
    safeExternalUrl("https://example.test/project"),
    "https://example.test/project",
  );
});
