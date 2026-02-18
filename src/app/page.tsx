import { fetchCompanies, formatMoney } from "@/lib/data";
import { CompanyTable } from "@/components/CompanyTable";

export default async function Home() {
  const companies = await fetchCompanies();

  const totalCompanies = companies.length;
  const totalRevenue = companies.reduce((s, c) => s + c.annualRevenue, 0);
  const avgRevPerEmp =
    companies.filter((c) => c.revenuePerEmployee > 0).reduce((s, c, _, a) => s + c.revenuePerEmployee / a.length, 0);
  const avgTeamSize =
    companies.filter((c) => c.employees > 0).reduce((s, c, _, a) => s + c.employees / a.length, 0);

  const safeAvgRevPerEmp = isNaN(avgRevPerEmp) || !isFinite(avgRevPerEmp) ? 0 : avgRevPerEmp;
  const safeAvgTeamSize = isNaN(avgTeamSize) || !isFinite(avgTeamSize) ? 0 : avgTeamSize;

  const metrics = [
    { label: "총 기업 수", value: totalCompanies.toString(), icon: "🏢" },
    { label: "총 매출", value: formatMoney(totalRevenue), icon: "💰" },
    { label: "평균 매출/직원", value: safeAvgRevPerEmp > 0 ? formatMoney(safeAvgRevPerEmp) : "N/A", icon: "⚡" },
    { label: "평균 팀 규모", value: safeAvgTeamSize > 0 ? Math.round(safeAvgTeamSize).toString() : "N/A", icon: "👥" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="glass-card p-5 transition-all duration-300">
            <div className="text-2xl mb-2">{m.icon}</div>
            <p className="text-text-secondary text-xs font-mono uppercase tracking-wider mb-1">
              {m.label}
            </p>
            <p className="text-2xl font-bold font-mono text-cyan-accent glow-cyan">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <CompanyTable companies={companies} />
    </div>
  );
}
