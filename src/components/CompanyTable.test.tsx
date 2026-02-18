import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { CompanyTable } from "./CompanyTable";
import type { Company } from "@/lib/data";

afterEach(cleanup);

const mockCompanies: Company[] = [
  {
    company: "TestCo",
    description: "AI startup",
    location: "Seoul",
    annualRevenue: 5_000_000,
    employees: 10,
    revenuePerEmployee: 500_000,
    profitable: true,
    monthsToARR: 6,
    totalFunding: 1_000_000,
    valuation: 20_000_000,
    valuationPerEmployee: 2_000_000,
    founded: 2020,
    lastUpdated: "2026-01",
    source: "test",
  },
  {
    company: "BigCorp",
    description: "Enterprise software",
    location: "SF",
    annualRevenue: 100_000_000,
    employees: 200,
    revenuePerEmployee: 500_000,
    profitable: false,
    monthsToARR: null,
    totalFunding: 50_000_000,
    valuation: 500_000_000,
    valuationPerEmployee: 2_500_000,
    founded: 2018,
    lastUpdated: "2026-01",
    source: "test",
  },
];

describe("CompanyTable", () => {
  it("renders company names", () => {
    render(<CompanyTable companies={mockCompanies} />);
    expect(screen.getByText("TestCo")).toBeInTheDocument();
    expect(screen.getByText("BigCorp")).toBeInTheDocument();
  });

  it("shows result count", () => {
    render(<CompanyTable companies={mockCompanies} />);
    expect(screen.getAllByText("2개 결과").length).toBeGreaterThanOrEqual(1);
  });

  it("filters by search", () => {
    render(<CompanyTable companies={mockCompanies} />);
    const input = screen.getAllByPlaceholderText("기업 검색...")[0];
    fireEvent.change(input, { target: { value: "TestCo" } });
    expect(screen.getAllByText("1개 결과").length).toBeGreaterThanOrEqual(1);
  });

  it("shows profitable badge", () => {
    render(<CompanyTable companies={mockCompanies} />);
    const yBadges = screen.getAllByText("예");
    expect(yBadges.length).toBeGreaterThanOrEqual(1);
    const nBadges = screen.getAllByText("아니오");
    expect(nBadges.length).toBeGreaterThanOrEqual(1);
  });

  it("sorts by clicking column header", () => {
    render(<CompanyTable companies={mockCompanies} />);
    const headers = screen.getAllByText(/연 매출/);
    fireEvent.click(headers[0]);
    expect(headers[0].textContent).toContain("↑");
  });

  it("shows ARR months or dash", () => {
    render(<CompanyTable companies={mockCompanies} />);
    expect(screen.getAllByText("6개월").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(1);
  });
});
