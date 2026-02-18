export type Locale = "ko" | "en";

const messages: Record<Locale, Record<string, string>> = {
  ko: {
    "nav.home": "홈",
    "nav.analytics": "분석",
    "metric.totalCompanies": "총 기업 수",
    "metric.totalRevenue": "총 매출",
    "metric.avgRevenuePerEmployee": "평균 매출/직원",
    "metric.avgTeamSize": "평균 팀 규모",
    "loading": "로딩 중...",
    "error.title": "문제가 발생했습니다",
    "error.unknown": "알 수 없는 오류가 발생했습니다.",
    "error.retry": "다시 시도",
  },
  en: {
    "nav.home": "Home",
    "nav.analytics": "Analytics",
    "metric.totalCompanies": "Total Companies",
    "metric.totalRevenue": "Total Revenue",
    "metric.avgRevenuePerEmployee": "Avg Revenue/Employee",
    "metric.avgTeamSize": "Avg Team Size",
    "loading": "Loading...",
    "error.title": "Something went wrong",
    "error.unknown": "An unknown error occurred.",
    "error.retry": "Try again",
  },
};

export function t(key: string, locale: Locale = "ko"): string {
  return messages[locale]?.[key] ?? key;
}
