import { fetchCompanies, formatMoney, formatNum } from "@/lib/data";
import Link from "next/link";

export default async function CompanyPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const companies = await fetchCompanies();
  const company = companies.find((c) => c.company === decodedName);

  if (!company) {
    return (
      <main className="text-center py-20">
        <h1 className="text-2xl font-mono text-text-secondary">회사를 찾을 수 없습니다</h1>
        <Link href="/" className="text-cyan-accent font-mono text-sm mt-4 inline-block hover:underline">← 돌아가기</Link>
      </main>
    );
  }

  const c = company;

  const mainStats = [
    { label: "연 매출", value: formatMoney(c.annualRevenue), accent: true },
    { label: "직원 수", value: formatNum(c.employees), accent: false },
    { label: "매출/직원", value: formatMoney(c.revenuePerEmployee), accent: true },
    { label: "기업가치", value: formatMoney(c.valuation), accent: false },
  ];

  const extraInfo = [
    { label: "수익성", value: c.profitable ? "예 ✓" : "아니오 ✗" },
    { label: "ARR 달성 기간", value: c.monthsToARR != null ? `${c.monthsToARR}개월` : "N/A" },
    { label: "총 펀딩", value: formatMoney(c.totalFunding) },
    { label: "직원당 기업가치", value: formatMoney(c.valuationPerEmployee) },
    { label: "설립연도", value: c.founded ? String(c.founded) : "N/A" },
    { label: "최근 업데이트", value: c.lastUpdated || "N/A" },
  ];

  return (
    <main>
      <Link href="/" className="text-cyan-accent font-mono text-sm mb-6 inline-block hover:underline">← 돌아가기</Link>

      <div className="glass-card p-6 mb-6">
        <h1 className="text-3xl font-bold font-mono text-cyan-accent mb-2">{c.company}</h1>
        {c.description && <p className="text-text-secondary text-base leading-relaxed mb-3">{c.description}</p>}
        {c.location && (
          <span className="text-xs font-mono px-2 py-1 rounded bg-violet-accent/20 text-violet-accent">{c.location}</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {mainStats.map((s) => (
          <div key={s.label} className="glass-card p-5 text-center">
            <div className="text-xs font-mono text-text-secondary uppercase mb-2">{s.label}</div>
            <div className={`text-2xl font-bold font-mono ${s.accent ? "text-cyan-accent" : "text-violet-accent"}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 mb-6">
        <h2 className="text-lg font-bold font-mono text-text-primary mb-4">추가 정보</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {extraInfo.map((item) => (
            <div key={item.label}>
              <div className="text-xs font-mono text-text-secondary uppercase mb-1">{item.label}</div>
              <div className="text-sm font-mono text-text-primary">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {c.source && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold font-mono text-text-primary mb-2">출처</h2>
          <a href={c.source} target="_blank" rel="noopener noreferrer" className="text-cyan-accent font-mono text-sm hover:underline break-all">
            {c.source} ↗
          </a>
        </div>
      )}
    </main>
  );
}
