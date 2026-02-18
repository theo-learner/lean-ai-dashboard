const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1vMlwTJ8_Lty161T73uwnMzVxb48XzHxz9aPNla5OgCjd2yJ0HMfxEHGSv1OsyGOarWUYDcsJZfmk/pub?output=csv";

export interface Company {
  company: string;
  description: string;
  location: string;
  annualRevenue: number;
  employees: number;
  revenuePerEmployee: number;
  profitable: boolean;
  monthsToARR: number | null;
  totalFunding: number;
  valuation: number;
  valuationPerEmployee: number;
  founded: number;
  lastUpdated: string;
  source: string;
}

export function parseMoney(val: string): number {
  if (!val || val === "N/A" || val === "-" || val === "") return 0;
  val = val.replace(/[$,]/g, "").trim();
  const mult = val.includes("B")
    ? 1e9
    : val.includes("M")
      ? 1e6
      : val.includes("K")
        ? 1e3
        : 1;
  const num = parseFloat(val.replace(/[BMK]/gi, ""));
  return isNaN(num) ? 0 : num * mult;
}

export function parseNum(val: string): number {
  if (!val || val === "N/A" || val === "-") return 0;
  const n = parseFloat(val.replace(/[,$]/g, "").trim());
  return isNaN(n) ? 0 : n;
}

export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        current.push(field);
        field = "";
      } else if (ch === "\n" || (ch === "\r" && text[i + 1] === "\n")) {
        current.push(field);
        field = "";
        if (current.some((c) => c.trim())) rows.push(current);
        current = [];
        if (ch === "\r") i++;
      } else {
        field += ch;
      }
    }
  }
  if (field || current.length) {
    current.push(field);
    if (current.some((c) => c.trim())) rows.push(current);
  }
  return rows;
}

export async function fetchCompanies(): Promise<Company[]> {
  const res = await fetch(CSV_URL, { next: { revalidate: 3600 } });
  const text = await res.text();
  const rows = parseCSV(text);
  if (rows.length < 2) return [];

  const data = rows.slice(1);
  return data
    .map((cols) => ({
      company: (cols[2] || "").trim(),
      description: (cols[3] || "").trim(),
      location: (cols[4] || "").trim(),
      annualRevenue: parseMoney(cols[5] || ""),
      employees: parseNum(cols[6] || ""),
      revenuePerEmployee: parseMoney(cols[7] || ""),
      profitable: ["yes", "true", "y", "예"].includes(
        (cols[8] || "").trim().toLowerCase(),
      ),
      monthsToARR:
        cols[9] && cols[9].trim() && cols[9].trim() !== "N/A"
          ? parseNum(cols[9])
          : null,
      totalFunding: parseMoney(cols[10] || ""),
      valuation: parseMoney(cols[11] || ""),
      valuationPerEmployee: parseMoney(cols[12] || ""),
      founded: parseNum(cols[13] || ""),
      lastUpdated: (cols[14] || "").trim(),
      source: (cols[15] || "").trim(),
    }))
    .filter((c) => c.company);
}

export function formatMoney(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  if (n === 0) return "N/A";
  return `$${n.toFixed(0)}`;
}

export function formatNum(n: number): string {
  if (n === 0) return "N/A";
  return n.toLocaleString();
}
