import { test, expect } from "@playwright/test";
import { resetDb } from "./utils";

test.describe("Profile Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Reset DB and login
    await resetDb();
    await page.goto("/login");
    await page.fill('input[name="email"]', "e2e@test.pl");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/dashboard");
  });

  test("should update user profile name", async ({ page }) => {
    // Navigate to profile page
    await page.locator('a[href="/dashboard/profile"]').click();
    await expect(
      page.getByRole("heading", { name: "Twój Profil" }),
    ).toBeVisible();

    // Modify user data
    await page.locator('input[name="lastName"]').fill("Tester Updated");

    // Submit changes
    await page.getByRole("button", { name: "Zapisz zmiany" }).click();
    await expect(page.locator("body")).toContainText(
      "Dane zostały zaktualizowane!",
    );

    // Verify global state update (navbar)
    await page.getByRole("link", { name: "Portal Pacjenta" }).click();
    await expect(page.locator("nav")).toContainText(
      "Witaj, E2E Tester Updated",
    );
  });
});
