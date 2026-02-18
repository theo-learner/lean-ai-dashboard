"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Company } from "@/lib/data";

export function AnalyticsCharts({ companies }: { companies: Company[] }) {
  const scatterData = companies
    .filter((c) => c.annualRevenue > 0 && c.employees > 0)
    .map((c) => ({
      name: c.company,
      employees: c.employees,
      revenue: c.annualRevenue / 1e6,
    }));

  const revPerEmp = companies
    .filter((c) => c.revenuePerEmployee > 0)
    .sort((a, b) => b.revenuePerEmployee - a.revenuePerEmployee)
    .slice(0, 20)
    .map((c) => ({
      name: c.company.length > 12 ? c.company.slice(0, 12) + "…" : c.company,
      value: c.revenuePerEmployee / 1e6,
      fullName: c.company,
    }));

  const valPerEmp = companies
    .filter((c) => c.valuationPerEmployee > 0)
    .sort((a, b) => b.valuationPerEmployee - a.valuationPerEmployee)
    .slice(0, 20)
    .map((c) => ({
      name: c.company.length > 12 ? c.company.slice(0, 12) + "…" : c.company,
      value: c.valuationPerEmployee / 1e6,
      fullName: c.company,
    }));

  const foundedMap = new Map<number, number>();
  companies.forEach((c) => {
    if (c.founded >= 2000) foundedMap.set(c.founded, (foundedMap.get(c.founded) || 0) + 1);
  });
  const foundedData = Array.from(foundedMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, count]) => ({ year: year.toString(), count }));

  const chartCard = "glass-card p-6 min-h-[400px]";

  const emptyMsg = (
    <div className="flex items-center justify-center h-[350px] text-text-secondary font-mono text-sm">
      데이터 없음
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={chartCard}>
        <h3 className="font-mono text-sm text-text-secondary mb-4 uppercase tracking-wider">
          연 매출 vs 직원 수
        </h3>
        {scatterData.length === 0 ? emptyMsg : <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="employees"
              name="직원 수"
              type="number"
              tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "JetBrains Mono" }}
              label={{ value: "직원 수", position: "bottom", fill: "#94a3b8", fontSize: 11 }}
            />
            <YAxis
              dataKey="revenue"
              name="연 매출 ($M)"
              type="number"
              tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "JetBrains Mono" }}
              label={{ value: "연 매출 ($M)", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(10,10,15,0.95)",
                border: "1px solid rgba(0,255,209,0.2)",
                borderRadius: 8,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
              }}
              formatter={(value: any, name: any) => [
                name === "연 매출 ($M)" ? `$${Number(value).toFixed(1)}M` : value,
                name,
              ]}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.name || ""}
            />
            <Scatter data={scatterData} fill="#00FFD1" fillOpacity={0.7}>
              {scatterData.map((_, i) => (
                <Cell key={i} fill={i % 2 === 0 ? "#00FFD1" : "#8B5CF6"} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>}
      </div>

      <div className={chartCard}>
        <h3 className="font-mono text-sm text-text-secondary mb-4 uppercase tracking-wider">
          직원당 매출 (상위 20) — $M
        </h3>
        {revPerEmp.length === 0 ? emptyMsg : <ResponsiveContainer width="100%" height={350}>
          <BarChart data={revPerEmp} margin={{ top: 10, right: 10, bottom: 40, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 9, fontFamily: "JetBrains Mono" }}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "JetBrains Mono" }} />
            <Tooltip
              contentStyle={{
                background: "rgba(10,10,15,0.95)",
                border: "1px solid rgba(0,255,209,0.2)",
                borderRadius: 8,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
              }}
              formatter={(value: any) => [`$${value.toFixed(2)}M`]}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""}
            />
            <Bar dataKey="value" fill="#00FFD1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>}
      </div>

      <div className={chartCard}>
        <h3 className="font-mono text-sm text-text-secondary mb-4 uppercase tracking-wider">
          직원당 기업가치 (상위 20) — $M
        </h3>
        {valPerEmp.length === 0 ? emptyMsg : <ResponsiveContainer width="100%" height={350}>
          <BarChart data={valPerEmp} margin={{ top: 10, right: 10, bottom: 40, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 9, fontFamily: "JetBrains Mono" }}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "JetBrains Mono" }} />
            <Tooltip
              contentStyle={{
                background: "rgba(10,10,15,0.95)",
                border: "1px solid rgba(0,255,209,0.2)",
                borderRadius: 8,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
              }}
              formatter={(value: any) => [`$${value.toFixed(1)}M`]}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""}
            />
            <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>}
      </div>

      <div className={chartCard}>
        <h3 className="font-mono text-sm text-text-secondary mb-4 uppercase tracking-wider">
          설립연도 분포
        </h3>
        {foundedData.length === 0 ? emptyMsg : <ResponsiveContainer width="100%" height={350}>
          <BarChart data={foundedData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="year"
              tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "JetBrains Mono" }}
            />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "JetBrains Mono" }} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(10,10,15,0.95)",
                border: "1px solid rgba(0,255,209,0.2)",
                borderRadius: 8,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
              }}
            />
            <Bar dataKey="count" fill="#00FFD1" radius={[4, 4, 0, 0]}>
              {foundedData.map((_, i) => (
                <Cell key={i} fill={i % 2 === 0 ? "#00FFD1" : "#8B5CF6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>}
      </div>
    </div>
  );
}
