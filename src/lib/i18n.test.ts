import { describe, it, expect } from "vitest";
import { t } from "./i18n";

describe("i18n", () => {
  it("returns Korean by default", () => {
    expect(t("nav.home")).toBe("홈");
  });
  it("returns English when specified", () => {
    expect(t("nav.home", "en")).toBe("Home");
  });
  it("returns key for missing translations", () => {
    expect(t("nonexistent.key")).toBe("nonexistent.key");
  });
});
