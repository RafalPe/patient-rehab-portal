import { test, expect } from "@playwright/test";
import { resetDb } from "./utils";

test.describe("Exercise Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Reset DB and login as test user
    await resetDb();
    await page.goto("/login");
    await page.fill('input[name="email"]', "e2e@test.pl");
    await page.fill('input[name="password"]', "password123");
    await Promise.all([
      page.waitForURL("**/dashboard"),
      page.click('button[type="submit"]'),
    ]);
  });

  test("should display exercise list and navigate to session", async ({
    page,
  }) => {
    // Check if exercise list is visible
    await expect(
      page.getByRole("heading", { name: "Twoje ćwiczenia" }),
    ).toBeVisible();

    // Find and click the start button for a specific exercise
    const startButton = page
      .locator("div")
      .filter({ hasText: "Testowa Bieżnia" })
      .getByRole("link", { name: "Rozpocznij" });

    await expect(startButton).toBeVisible();
    await startButton.click();

    // Verify navigation to the exercise page
    await expect(page).toHaveURL(/\/dashboard\/exercise\/ex_e2e/);
    await expect(
      page.getByRole("heading", { name: "Testowa Bieżnia" }),
    ).toBeVisible();
  });

  test("should start timer and complete exercise", async ({ page }) => {
    // Navigate directly to exercise page
    await page.goto("/dashboard/exercise/ex_e2e");

    // Start the exercise session
    await page.getByRole("button", { name: "Rozpocznij sesję" }).click();

    await expect(page.getByText("Ćwiczenie w toku...")).toBeVisible();

    // Wait for the simulated exercise duration (handling potential delays)
    await expect(
      page.getByText("Przetwarzanie danych z urządzenia..."),
    ).toBeVisible({
      timeout: 20000,
    });

    // Verify automatic redirect to dashboard after completion
    await expect(page).toHaveURL("/dashboard", { timeout: 10000 });

    // Verify the exercise status is updated to "Wykonane"
    const exerciseCard = page
      .locator("div")
      .filter({ hasText: "Testowa Bieżnia" });
    await expect(exerciseCard.getByText("Wykonane")).toBeVisible();
  });
});
