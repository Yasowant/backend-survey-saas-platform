export interface DashboardAnalytics {
  overview: {
    totalSurveys: number;
    publishedSurveys: number;
    draftSurveys: number;
    totalResponses: number;
    totalUsers: number;
  };

  responseStats: {
    responsesToday: number;
    responsesThisWeek: number;
    responsesThisMonth: number;
  };

  surveyStats: {
    averageResponsesPerSurvey: number;
    mostPopularSurvey: {
      id: string | null;
      title: string;
      responses: number;
    } | null;
  };

  recentSurveys: {
    id: string;
    title: string;
    status: string;
    createdAt: Date;
  }[];

  responseTrend: {
    date: string;
    count: number;
  }[];
}

export interface SurveyAnalytics {
  surveyId: string;
  surveyTitle: string;
  totalResponses: number;
  totalQuestions: number;
  totalSections: number;
}
