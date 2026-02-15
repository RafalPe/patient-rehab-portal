import { request } from "@playwright/test";

export async function resetDb() {
  const context = await request.newContext({
    baseURL: "http://localhost:3000",
  });
  const response = await context.post("/api/test/reset-db");
  if (!response.ok()) {
    throw new Error(`Failed to reset database: ${await response.text()}`);
  }
}
