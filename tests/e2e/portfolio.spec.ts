import { test, expect } from "@playwright/test";
import en from "../../lang/en.json";
import sr from "../../lang/sr.json";
import config from "../../data/config.json";
import skills from "../../data/mySkills.json";
import experiences from "../../data/myExperience.json";

// Chromium may not share Node's injected proxy CA in managed environments.
// Fetch real CDN images using Node's verified HTTPS client, preserving the
// status, headers and bytes. No image fixtures or TLS bypass are used.
test.beforeEach(async ({ context }) => {
  if (!process.env.PLAYWRIGHT_PROXY_SERVER) return;
  await context.route("https://cdn.sanity.io/**", async (route) => {
    const response = await context.request.get(route.request().url());
    await route.fulfill({ response });
  });
});
test.afterEach(async ({ context }) => {
  // Finish CDN responses before disposing their verified request context.
  await context.unrouteAll({ behavior: "wait" });
});

for (const locale of ["en", "sr"] as const) {
  const prefix = locale === "sr" ? "/sr" : "";
  const t = locale === "sr" ? sr : en;
  test(`${locale}: home renders original copy, skills and all experiences without browser errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(prefix || "/");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page).toHaveTitle(t.seo.index.title);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      t.LandingHero.title.replace(/\n/g, " "),
      { useInnerText: true },
    );
    await expect(
      page.getByRole("heading", { name: t["About me"], exact: true }),
    ).toBeVisible();
    for (const text of Object.values(t.AboutMe))
      await expect(page.locator("main")).toContainText(text.replace(/\\/g, ""));
    for (const skill of Object.values(skills).flat())
      await expect(
        page.locator("main li").filter({ hasText: skill.name }).first(),
      ).toBeAttached();
    for (const event of experiences)
      await expect(
        page.getByRole("heading", { name: event.title[locale], exact: true }),
      ).toBeAttached();
    await page
      .getByRole("heading", { name: t["My experience"], exact: true })
      .scrollIntoViewIfNeeded();
    await expect(page.locator("main")).toContainText(
      experiences[0].workplace[locale],
    );
    await expect(page.locator("footer")).toContainText(config.full_name);
    expect(errors).toEqual([]);
  });
  test(`${locale}: contact form validates input, handles delivery failure, retries and succeeds`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/contact`);
    await expect(page).toHaveTitle(t.seo.contact.title);
    const email = page.getByRole("textbox", {
      name: t["Your email"],
      exact: true,
    });
    await email.fill("invalid");
    await email.blur();
    await expect(
      page.getByText(t.errorMessages.invalidEmail, { exact: true }),
    ).toBeVisible();
    await email.fill("failure@example.test");
    await page
      .getByRole("textbox", { name: t.Subject, exact: true })
      .fill("A preserved subject");
    await page
      .getByRole("textbox", { name: t["Your message"], exact: true })
      .fill("A preserved message");
    await page.getByRole("button", { name: t.Submit, exact: true }).click();
    await expect(
      page.getByText(t["contact-submit-error-title"], { exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: t["Try again"], exact: true })
      .click();
    await expect(
      page.getByRole("textbox", { name: t.Subject, exact: true }),
    ).toHaveValue("A preserved subject");
    await email.fill("success@example.test");
    await page.getByRole("button", { name: t.Submit, exact: true }).click();
    await expect(
      page.getByText(t["contact-submit-success-title"], { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: t["Go back to homepage"], exact: true }),
    ).toHaveAttribute("href", prefix || "/");
  });
  test(`${locale}: live Sanity projects, list persistence, details and gallery work`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${prefix}/projects`);
    await expect(page).toHaveTitle(t.seo.projects.title);
    await expect(
      page.locator('[data-testid="projects"] article').first(),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: locale === "sr" ? "Prikaz liste" : "List view",
      })
      .click();
    await page.reload();
    await expect(page.getByTestId("projects")).toHaveAttribute(
      "data-view",
      "list",
    );
    const link = page.locator('[data-testid="projects"] h2 a').first();
    const name = await link.innerText();
    const href = await link.getAttribute("href");
    await link.click();
    await expect(page).toHaveURL(new RegExp(href! + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name);
    await expect(page).toHaveTitle(name);
    await page
      .getByRole("button", {
        name: new RegExp(
          locale === "sr" ? "^Otvori sliku 1:" : "^Open image 1:",
        ),
      })
      .click();
    const gallery = page.getByRole("dialog", { name: t["Project gallery"] });
    await expect(gallery).toBeVisible();
    await expect
      .poll(() =>
        gallery
          .locator("img")
          .evaluate((image) => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
    await page
      .getByRole("button", {
        name: locale === "sr" ? "Promeni uvećanje" : "Toggle zoom",
      })
      .click();
    await expect(
      page.getByRole("button", {
        name: locale === "sr" ? "Promeni uvećanje" : "Toggle zoom",
      }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("button", {
        name: locale === "sr" ? "Promeni uvećanje" : "Toggle zoom",
      }),
    ).toHaveAttribute("aria-pressed", "false");
    await page.keyboard.press("Escape");
    await expect(gallery).not.toBeVisible();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    expect(errors).toEqual([]);
  });
  test(`${locale}: unknown routes and missing projects return localized 404`, async ({
    page,
  }) => {
    for (const path of ["/does-not-exist", "/projects/does-not-exist"]) {
      const response = await page.goto(prefix + path);
      expect(response?.status()).toBe(404);
      await expect(
        page.getByRole("heading", { name: t.errorPage.title, exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: t.errorPage.goHome, exact: true }),
      ).toHaveAttribute("href", prefix || "/");
    }
  });
}
test("language switch preserves current page and updates server language and metadata", async ({
  page,
}) => {
  await page.goto("/contact");
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByLabel("Change language")
    .click();
  await page.getByRole("link", { name: "Srpski", exact: true }).click();
  await expect(page).toHaveURL("/sr/contact");
  await expect(page.locator("html")).toHaveAttribute("lang", "sr");
  await expect(page).toHaveTitle(sr.seo.contact.title);
  await page
    .getByRole("navigation", { name: "Glavna navigacija", exact: true })
    .getByLabel("Promeni jezik")
    .click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL("/contact");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
test("theme defaults to system and persists after navigation and reload", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Toggle theme", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page.locator("html")).toHaveClass(/light/);
});
test("mobile menu traps focus, closes with Escape and navigates without overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(menu).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open menu", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await menu.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL("/contact");
  await expect(menu).not.toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("API rejects malformed requests and escapes HTML in provider payload", async ({
  request,
}) => {
  const malformed = await request.post("/api/sendEmail", {
    data: "broken",
    headers: { "Content-Type": "application/json" },
  });
  expect(malformed.status()).toBe(400);
  expect(
    (await request.post("/api/sendEmail", { data: { email: "bad" } })).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/sendEmail", {
        data: {
          email: "safe@example.test",
          subject: "x",
          message: "x".repeat(21000),
        },
      })
    ).status(),
  ).toBe(413);
  const result = await request.post("/api/sendEmail", {
    data: {
      email: "safe@example.test",
      phone: "",
      subject: "<script>alert(1)</script>",
      message: "<img onerror=alert(1)>",
    },
  });
  expect(result.status()).toBe(200);
  const payload = await (
    await request.get("http://127.0.0.1:3101/last")
  ).text();
  expect(payload).toContain("&lt;script&gt;");
  expect(payload).toContain("&lt;img");
  expect(payload).toContain("h:Reply-To");
});
test("root browser locale negotiation and explicit English selection work", async ({
  browser,
  request,
}) => {
  const response = await request.get("/", {
    headers: { "Accept-Language": "sr-RS,sr;q=0.9,en;q=0.8" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toContain("/sr");
  const context = await browser.newContext({ locale: "sr-RS" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL("/sr");
  await page
    .getByRole("navigation", { name: "Glavna navigacija", exact: true })
    .getByLabel("Promeni jezik")
    .click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await context.close();
});

for (const locale of ["en", "sr"] as const) {
  test(`${locale}: every published project detail keeps its title and description`, async ({
    page,
  }) => {
    const prefix = locale === "sr" ? "/sr" : "";
    await page.goto(`${prefix}/projects`);
    await expect(
      page.locator('[data-testid="projects"] h2 a').first(),
    ).toBeVisible();
    const entries = await page
      .locator('[data-testid="projects"] article')
      .evaluateAll((cards) =>
        cards.map((card) => ({
          href: card.querySelector("h2 a")?.getAttribute("href"),
          name: card.querySelector("h2")?.textContent?.trim(),
          description: card.querySelector("p")?.textContent?.trim(),
        })),
      );
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.href).toBeTruthy();
      const response = await page.goto(entry.href!);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        entry.name!,
      );
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        entry.description!,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(entry.href! + "$"),
      );
    }
  });
}

test("desktop and mobile pages fit the viewport and local assets load", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/contact",
      "/projects",
      "/sr",
      "/sr/contact",
      "/sr/projects",
    ]) {
      await page.goto(path);
      await expect(page.locator("main")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}px`,
      ).toBe(true);
      const visibleLocalImages = page.locator('main img[src^="/_next/image"]');
      for (const image of await visibleLocalImages.all()) {
        if (await image.isVisible()) {
          await image.scrollIntoViewIfNeeded();
          await expect
            .poll(() =>
              image.evaluate(
                (element) => (element as HTMLImageElement).naturalWidth,
              ),
            )
            .toBeGreaterThan(0);
        }
      }
      if (width === 1440 && path === "/")
        await page.screenshot({
          path: "test-results/desktop-home.png",
          fullPage: true,
        });
      if (width === 390 && path === "/contact")
        await page.screenshot({
          path: "test-results/mobile-contact.png",
          fullPage: true,
        });
    }
  }
});
