import dynamic from "next/dynamic";
import { fetchCompanies } from "@/lib/data";

const AnalyticsCharts = dynamic(
  () =>
    import("@/components/AnalyticsCharts").then((mod) => mod.AnalyticsCharts),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export default async function AnalyticsPage() {
  const companies = await fetchCompanies();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-mono">
        <span className="text-cyan-accent glow-cyan">$</span> 분석
      </h2>
      <AnalyticsCharts companies={companies} />
    </div>
  );
}
