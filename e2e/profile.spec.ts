import { test, expect } from "@playwright/test";

test.describe("Profile Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "e2e@test.pl");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/dashboard");
  });

  test("should update user profile name", async ({ page }) => {
    await page.locator('a[href="/dashboard/profile"]').click();
    await expect(
      page.getByRole("heading", { name: "Twój Profil" }),
    ).toBeVisible();

    await page.locator('input[name="lastName"]').fill("Tester Updated");

    await page.getByRole("button", { name: "Zapisz zmiany" }).click();
    await expect(page.locator("body")).toContainText(
      "Dane zostały zaktualizowane!",
    );

    await page.getByRole("link", { name: "Portal Pacjenta" }).click();
    await expect(page.locator("nav")).toContainText(
      "Witaj, E2E Tester Updated",
    );
  });
});
