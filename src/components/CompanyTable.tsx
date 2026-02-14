"use client";

import { useState, useMemo } from "react";
import type { Company } from "@/lib/data";
import { formatMoney, formatNum } from "@/lib/data";

type SortKey = "annualRevenue" | "employees" | "revenuePerEmployee" | "valuation";

export function CompanyTable({ companies }: { companies: Company[] }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("annualRevenue");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return companies
      .filter(
        (c) =>
          c.company.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      )
      .sort((a, b) => (sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]));
  }, [companies, search, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const cols: { key: SortKey; label: string }[] = [
    { key: "annualRevenue", label: "연 매출" },
    { key: "employees", label: "직원 수" },
    { key: "revenuePerEmployee", label: "매출/직원" },
    { key: "valuation", label: "기업가치" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="기업 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-card border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-cyan-accent/50 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary text-xs font-mono">
            {filtered.length}개 결과
          </span>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-text-secondary font-mono text-xs uppercase tracking-wider">
                  기업명
                </th>
                {cols.map((c) => (
                  <th
                    key={c.key}
                    onClick={() => handleSort(c.key)}
                    className="text-right p-4 text-text-secondary font-mono text-xs uppercase tracking-wider cursor-pointer hover:text-cyan-accent transition-colors whitespace-nowrap"
                  >
                    {c.label} {sortKey === c.key ? (sortAsc ? "↑" : "↓") : ""}
                  </th>
                ))}
                <th className="text-right p-4 text-text-secondary font-mono text-xs uppercase tracking-wider whitespace-nowrap">
                  ARR 달성(월)
                </th>
                <th className="text-center p-4 text-text-secondary font-mono text-xs uppercase tracking-wider">
                  수익성
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.company + i}
                  className="border-b border-border/50 hover:bg-bg-card-hover transition-colors"
                >
                  <td className="p-4">
                    <div className="font-semibold text-text-primary">{c.company}</div>
                    <div className="hidden sm:block text-xs text-text-secondary mt-0.5 line-clamp-1">
                      {c.description}
                    </div>
                    <div className="hidden sm:block text-xs text-text-secondary/60 font-mono mt-0.5">
                      {c.location} · 설립 {c.founded || "N/A"}
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-cyan-accent">
                    {formatMoney(c.annualRevenue)}
                  </td>
                  <td className="p-4 text-right font-mono">{formatNum(c.employees)}</td>
                  <td className="p-4 text-right font-mono text-violet-accent">
                    {formatMoney(c.revenuePerEmployee)}
                  </td>
                  <td className="p-4 text-right font-mono">
                    {formatMoney(c.valuation)}
                  </td>
                  <td className="p-4 text-right font-mono text-text-secondary">
                    {c.monthsToARR != null ? `${c.monthsToARR}개월` : "—"}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-mono ${
                        c.profitable
                          ? "bg-cyan-accent/10 text-cyan-accent"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {c.profitable ? "예" : "아니오"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
