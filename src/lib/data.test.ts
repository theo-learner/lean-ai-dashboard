import { describe, it, expect } from "vitest";
import { formatMoney, formatNum } from "./data";

describe("formatMoney", () => {
  it("formats billions", () => {
    expect(formatMoney(2_500_000_000)).toBe("$2.5B");
  });
  it("formats millions", () => {
    expect(formatMoney(15_000_000)).toBe("$15.0M");
  });
  it("formats thousands", () => {
    expect(formatMoney(5_000)).toBe("$5K");
  });
  it("returns N/A for zero", () => {
    expect(formatMoney(0)).toBe("N/A");
  });
  it("formats small numbers", () => {
    expect(formatMoney(42)).toBe("$42");
  });
});

describe("formatNum", () => {
  it("returns N/A for zero", () => {
    expect(formatNum(0)).toBe("N/A");
  });
  it("formats with locale", () => {
    const result = formatNum(1234);
    expect(result).toContain("1");
    expect(result).toContain("234");
  });
});
