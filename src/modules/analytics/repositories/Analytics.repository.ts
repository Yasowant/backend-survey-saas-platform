import { SurveyModel } from "../../surveys/models/Survey.model";
import { ResponseModel } from "../../responses/models/Response.model";
import { UserModel } from "../../users/models/User.model";
import mongoose from "mongoose";

export class AnalyticsRepository {
  async getTotalSurveys() {
    return SurveyModel.countDocuments();
  }

  async getResponsesToday() {
    const today = new Date();

    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    return ResponseModel.countDocuments({
      createdAt: {
        $gte: startOfDay,
      },
    });
  }

  async getResponsesThisWeek() {
    const startOfWeek = new Date();

    startOfWeek.setDate(startOfWeek.getDate() - 7);

    return ResponseModel.countDocuments({
      createdAt: {
        $gte: startOfWeek,
      },
    });
  }

  async getResponsesThisMonth() {
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return ResponseModel.countDocuments({
      createdAt: {
        $gte: startOfMonth,
      },
    });
  }

  async getResponseTrend() {
    return ResponseModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          responses: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }
  async getPublishedSurveys() {
    return SurveyModel.countDocuments({
      status: "PUBLISHED",
    });
  }

  async getDraftSurveys() {
    return SurveyModel.countDocuments({
      status: "DRAFT",
    });
  }

  async getTotalResponses() {
    return ResponseModel.countDocuments();
  }

  async getTotalUsers() {
    return UserModel.countDocuments();
  }

  async getRecentSurveys() {
    return SurveyModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status createdAt");
  }

  async getSurveyById(id: string) {
    return SurveyModel.findById(id);
  }

  async getSurveyResponseCount(surveyId: string) {
    return ResponseModel.countDocuments({
      surveyId,
    });
  }

  async getMostPopularSurvey() {
    const result = await ResponseModel.aggregate([
      {
        $group: {
          _id: "$surveyId",
          responses: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          responses: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    return result[0] || null;
  }

  async getRecentResponses(surveyId: string) {
    return ResponseModel.find({
      surveyId,
    })
      .populate("submittedBy", "firstName lastName email")
      .sort({ createdAt: -1 })
      .limit(10);
  }

  async getSurveyResponseTrend(surveyId: string) {
    return ResponseModel.aggregate([
      {
        $match: {
          surveyId: new mongoose.Types.ObjectId(surveyId),
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }
}
