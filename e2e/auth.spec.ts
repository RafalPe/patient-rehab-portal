import { test, expect } from "@playwright/test";
import { resetDb } from "./utils";

test.describe("Login Flow", () => {
  test.beforeEach(async () => {
    // Reset DB to ensure clean state
    await resetDb();
  });
  test("should allow user to login with valid credentials", async ({
    page,
  }) => {
    await page.goto("/login");

    // Perform login
    await page.fill('input[name="email"]', "pacjent@test.pl");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Verify successful redirect and dashboard content
    await expect(page).toHaveURL("/dashboard");
    await expect(
      page.getByRole("heading", { name: "Twoje ćwiczenia" }),
    ).toBeVisible();
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/login");

    // Attempt login with wrong password
    await page.fill('input[name="email"]', "pacjent@test.pl");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // Verify error message and no redirect
    await expect(
      page.getByText("Nieprawidłowy e-mail lub hasło"),
    ).toBeVisible();
    await expect(page).toHaveURL("/login");
  });

  test("should allow user to logout", async ({ page }) => {
    // Determine login flow
    await page.goto("/login");
    await page.fill('input[name="email"]', "pacjent@test.pl");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/dashboard");

    // Click logout button
    await page.click('button:has-text("Wyloguj")');

    // Verify redirect back to login
    await expect(page).toHaveURL("/login");
  });
});
