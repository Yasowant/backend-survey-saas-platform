import { NotFoundError } from "../../../shared/exceptions/NotFoundError";

import { AnalyticsRepository } from "../repositories/Analytics.repository";

import { SectionModel } from "../../sections/models/Section.model";
import { QuestionModel } from "../../questions/models/Question.model";
import { ResponseModel } from "../../responses/models/Response.model";

export class AnalyticsService {
  constructor(
    private readonly analyticsRepository = new AnalyticsRepository(),
  ) {}

  async getDashboardAnalytics() {
    const [
      totalSurveys,
      publishedSurveys,
      draftSurveys,
      totalResponses,
      totalUsers,
      recentSurveys,
      mostPopularSurvey,
      responsesToday,
      responsesThisWeek,
      responsesThisMonth,
      responseTrend,
    ] = await Promise.all([
      this.analyticsRepository.getTotalSurveys(),
      this.analyticsRepository.getPublishedSurveys(),
      this.analyticsRepository.getDraftSurveys(),
      this.analyticsRepository.getTotalResponses(),
      this.analyticsRepository.getTotalUsers(),
      this.analyticsRepository.getRecentSurveys(),
      this.analyticsRepository.getMostPopularSurvey(),

      this.analyticsRepository.getResponsesToday(),
      this.analyticsRepository.getResponsesThisWeek(),
      this.analyticsRepository.getResponsesThisMonth(),
      this.analyticsRepository.getResponseTrend(),
    ]);

    let popularSurvey = null;

    if (mostPopularSurvey) {
      const survey = await this.analyticsRepository.getSurveyById(
        mostPopularSurvey._id,
      );

      popularSurvey = {
        id: survey?._id,
        title: survey?.title || "",
        responses: mostPopularSurvey.responses,
      };
    }

    return {
      overview: {
        totalSurveys,
        publishedSurveys,
        draftSurveys,
        totalResponses,
        totalUsers,
      },

      responseStats: {
        responsesToday,
        responsesThisWeek,
        responsesThisMonth,
      },

      surveyStats: {
        averageResponsesPerSurvey:
          totalSurveys === 0
            ? 0
            : Number((totalResponses / totalSurveys).toFixed(2)),

        mostPopularSurvey: popularSurvey,
      },

      recentSurveys: recentSurveys.map((survey) => ({
        id: survey._id,
        title: survey.title,
        status: survey.status,
        createdAt: survey.createdAt,
      })),

      responseTrend: responseTrend.map((item: any) => ({
        date: item._id,
        responses: item.responses,
      })),
    };
  }

  async getSurveyAnalytics(surveyId: string) {
    const survey = await this.analyticsRepository.getSurveyById(surveyId);

    if (!survey) {
      throw new NotFoundError("Survey not found");
    }

    const [
      totalResponses,
      totalSections,
      totalQuestions,
      recentResponses,
      trend,
      questions,
    ] = await Promise.all([
      this.analyticsRepository.getSurveyResponseCount(surveyId),

      SectionModel.countDocuments({
        surveyId,
      }),

      QuestionModel.countDocuments({
        surveyId,
      }),

      this.analyticsRepository.getRecentResponses(surveyId),

      this.analyticsRepository.getSurveyResponseTrend(surveyId),

      QuestionModel.find({
        surveyId,
      }).select("type"),
    ]);

    const questionTypeStats = {
      text: 0,
      textarea: 0,
      radio: 0,
      checkbox: 0,
      dropdown: 0,
      number: 0,
    };

    questions.forEach((q: any) => {
      switch (q.type) {
        case "TEXT":
          questionTypeStats.text++;
          break;

        case "TEXTAREA":
          questionTypeStats.textarea++;
          break;

        case "RADIO":
          questionTypeStats.radio++;
          break;

        case "CHECKBOX":
          questionTypeStats.checkbox++;
          break;

        case "DROPDOWN":
          questionTypeStats.dropdown++;
          break;

        case "NUMBER":
          questionTypeStats.number++;
          break;
      }
    });

    return {
      surveyId: survey._id,
      surveyTitle: survey.title,
      surveyDescription: survey.description,
      status: survey.status,

      totalResponses,
      totalSections,
      totalQuestions,

      completionRate: totalResponses > 0 ? 100 : 0,

      createdAt: survey.createdAt,
      updatedAt: survey.updatedAt,

      recentResponses: recentResponses.map((r: any, index: number) => ({
        id: r._id,

        responseNumber: totalResponses - index,

        respondentName: r.submittedBy
          ? `${r.submittedBy.firstName} ${r.submittedBy.lastName}`
          : "Anonymous",

        respondentEmail: r.submittedBy?.email || null,

        submittedAt: r.createdAt,
      })),

      questionTypeStats,

      responseTrend: trend.map((item: any) => ({
        date: item._id,
        count: item.count,
      })),
    };
  }
}
