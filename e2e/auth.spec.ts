import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("should allow user to login with valid credentials", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "pacjent@test.pl");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/dashboard");
    await expect(
      page.getByRole("heading", { name: "Twoje ćwiczenia" }),
    ).toBeVisible();
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "pacjent@test.pl");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    await expect(
      page.getByText("Nieprawidłowy e-mail lub hasło"),
    ).toBeVisible();
    await expect(page).toHaveURL("/login");
  });

  test("should allow user to logout", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "pacjent@test.pl");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/dashboard");

    await page.click('button:has-text("Wyloguj")');
    await expect(page).toHaveURL("/login");
  });
});
