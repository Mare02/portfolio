import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    proxy: process.env.PLAYWRIGHT_PROXY_SERVER
      ? {
          server: process.env.PLAYWRIGHT_PROXY_SERVER,
          bypass: "localhost,127.0.0.1,::1",
        }
      : undefined,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : {},
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "node tests/mock-mailgun.mjs",
      url: "http://127.0.0.1:3101/health",
      reuseExistingServer: false,
    },
    {
      command: "npm run start -- --hostname 127.0.0.1 --port 3100",
      url: "http://127.0.0.1:3100",
      reuseExistingServer: false,
      timeout: 60000,
      env: {
        MAILGUN_API_KEY: "test-key",
        MAILGUN_DOMAIN: "example.test",
        MAILGUN_SENDER: "Portfolio <sender@example.test>",
        MAILGUN_EMAIL_TO: "owner@example.test",
        MAILGUN_API_URL: "http://127.0.0.1:3101",
        SANITY_PROJECT_ID: "bmfvsnwe",
        SANITY_DATASET: "production",
      },
    },
  ],
});
