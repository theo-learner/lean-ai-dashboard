import { describe, it, expect } from "vitest";
import { formatMoney, formatNum, parseMoney, parseNum, parseCSV } from "./data";

describe("formatMoney", () => {
  it("formats billions", () => expect(formatMoney(2_500_000_000)).toBe("$2.5B"));
  it("formats millions", () => expect(formatMoney(15_000_000)).toBe("$15.0M"));
  it("formats thousands", () => expect(formatMoney(5_000)).toBe("$5K"));
  it("returns N/A for zero", () => expect(formatMoney(0)).toBe("N/A"));
  it("formats small numbers", () => expect(formatMoney(42)).toBe("$42"));
});

describe("formatNum", () => {
  it("returns N/A for zero", () => expect(formatNum(0)).toBe("N/A"));
  it("formats with locale", () => {
    const result = formatNum(1234);
    expect(result).toContain("1");
    expect(result).toContain("234");
  });
});

describe("parseMoney", () => {
  it("parses billions", () => expect(parseMoney("$2.5B")).toBe(2_500_000_000));
  it("parses millions", () => expect(parseMoney("$15M")).toBe(15_000_000));
  it("parses thousands", () => expect(parseMoney("$5K")).toBe(5_000));
  it("parses plain number", () => expect(parseMoney("$100")).toBe(100));
  it("handles commas", () => expect(parseMoney("$1,000")).toBe(1000));
  it("returns 0 for N/A", () => expect(parseMoney("N/A")).toBe(0));
  it("returns 0 for empty", () => expect(parseMoney("")).toBe(0));
  it("returns 0 for dash", () => expect(parseMoney("-")).toBe(0));
  it("returns 0 for NaN", () => expect(parseMoney("abc")).toBe(0));
});

describe("parseNum", () => {
  it("parses number", () => expect(parseNum("42")).toBe(42));
  it("handles commas", () => expect(parseNum("1,000")).toBe(1000));
  it("returns 0 for N/A", () => expect(parseNum("N/A")).toBe(0));
  it("returns 0 for empty", () => expect(parseNum("")).toBe(0));
  it("returns 0 for dash", () => expect(parseNum("-")).toBe(0));
});

describe("parseCSV", () => {
  it("parses simple CSV", () => {
    const result = parseCSV("a,b,c\n1,2,3");
    expect(result).toEqual([["a", "b", "c"], ["1", "2", "3"]]);
  });

  it("handles quoted fields", () => {
    const result = parseCSV('"hello, world",b\n1,2');
    expect(result[0][0]).toBe("hello, world");
  });

  it("handles escaped quotes", () => {
    const result = parseCSV('"say ""hi""",b\n1,2');
    expect(result[0][0]).toBe('say "hi"');
  });

  it("handles CRLF", () => {
    const result = parseCSV("a,b\r\n1,2");
    expect(result).toEqual([["a", "b"], ["1", "2"]]);
  });

  it("skips empty rows", () => {
    const result = parseCSV("a,b\n\n1,2");
    expect(result.length).toBe(2);
  });

  it("handles empty input", () => {
    expect(parseCSV("")).toEqual([]);
  });
});
