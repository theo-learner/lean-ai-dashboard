import { fetchCompanies } from "@/lib/data";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";

export default async function AnalyticsPage() {
  const companies = await fetchCompanies();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-mono">
        <span className="text-cyan-accent glow-cyan">$</span> analytics
      </h2>
      <AnalyticsCharts companies={companies} />
    </div>
  );
}
