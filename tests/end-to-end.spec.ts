import { test, expect } from "@playwright/test";

test("test-basic-layout", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Add to Site" }).first().click();
  await page.getByRole("button", { name: "Add to Site" }).nth(1).click();
  await expect(page.getByText("MegapackXL-1+")).toBeDefined();
  await expect(page.getByText("Megapack2-1+")).toBeDefined();
  await expect(page.getByText("Transformer1")).toBeDefined();
  await expect(page.getByText("ft²").first()).toBeDefined();
  await expect(page.getByText("ft²").nth(1)).toBeDefined();
  await expect(page.getByText("6.5 MWh")).toBeDefined();
  await expect(page.getByText("$210,000")).toBeDefined();
  await expect(page.getByText("10 ft", { exact: true })).toBeDefined();
  await expect(page.getByText("80 ft")).toBeDefined();
});
