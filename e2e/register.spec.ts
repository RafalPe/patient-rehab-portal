import { test, expect } from "@playwright/test";
import { resetDb } from "./utils";

test.describe("Registration Flow", () => {
  test.beforeEach(async () => {
    await resetDb();
  });

  test("should allow user to register and see success message", async ({
    page,
  }) => {
    await page.goto("/register");

    const uniqueId = Date.now();
    const newUser = {
      firstName: "Test",
      lastName: "Register",
      email: `register_${uniqueId}@test.pl`,
      password: "password123",
    };

    // Fill registration form
    await page.getByLabel("Imię").fill(newUser.firstName);
    await page.getByLabel("Nazwisko").fill(newUser.lastName);
    await page.getByLabel("Email").fill(newUser.email);
    await page.getByLabel("Hasło", { exact: true }).fill(newUser.password);
    await page.getByLabel("Potwierdź hasło").fill(newUser.password);

    await page.getByRole("button", { name: "Zarejestruj się" }).click();

    // Should redirect to login page
    await expect(page).toHaveURL(/\/login/);

    // Verify success message
    await expect(
      page.getByText("Utworzono konto, można się zalogować."),
    ).toBeVisible();

    // Now login with new credentials
    await page.getByLabel("Email").fill(newUser.email);
    await page.getByLabel("Hasło").fill(newUser.password);
    await page.getByRole("button", { name: "Zaloguj się" }).click();

    // Verify dashboard access
    await expect(page.locator("nav")).toContainText(
      `Witaj, ${newUser.firstName} ${newUser.lastName}`,
    );
  });
});
