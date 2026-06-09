export interface SurveyAnalytics {
  surveyId: string;
  surveyTitle: string;
  surveyDescription: string;
  status: string;

  totalResponses: number;
  totalSections: number;
  totalQuestions: number;

  completionRate: number;

  createdAt: Date;
  updatedAt: Date;

  recentResponses: {
    id: string;
    respondentName?: string;
    respondentEmail?: string;
    submittedAt: Date;
    status: "Completed";
    responseNumber: number;
  }[];

  questionTypeStats: {
    text: number;
    textarea: number;
    radio: number;
    checkbox: number;
    dropdown: number;
    number: number;
  };

  responseTrend: {
    date: string;
    count: number;
  }[];
}
