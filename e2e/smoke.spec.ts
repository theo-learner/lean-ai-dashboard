import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads with title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/린 AI/);
    await expect(page.locator("h1")).toContainText("린 AI 리더보드");
  });

  test("company table renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("table")).toBeVisible();
    await expect(page.locator("th").first()).toBeVisible();
  });

  test("search filters companies", async ({ page }) => {
    await page.goto("/");
    const input = page.getByPlaceholder("기업 검색...");
    await expect(input).toBeVisible();
    await input.fill("test");
    // Table should still be visible
    await expect(page.locator("table")).toBeVisible();
  });

  test("analytics page loads", async ({ page }) => {
    await page.goto("/analytics");
    await expect(page.locator("h2")).toContainText("분석");
  });

  test("navigation works", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/analytics"]');
    await expect(page).toHaveURL(/analytics/);
  });
});
