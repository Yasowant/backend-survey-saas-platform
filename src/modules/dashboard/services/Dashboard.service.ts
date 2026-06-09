import { SurveyModel } from "../../surveys/models/Survey.model";
import { ResponseModel } from "../../responses/models/Response.model";
import { UserModel } from "../../users/models/User.model";

export class DashboardService {
  async getStats() {
    const [
      totalUsers,
      totalSurveys,
      totalResponses,
      publishedSurveys,
      draftSurveys,
      recentSurveys,
      recentResponses,
      surveyTrendRaw,
      responseTrendRaw,
    ] = await Promise.all([
      UserModel.countDocuments(),
      SurveyModel.countDocuments(),
      ResponseModel.countDocuments(),
      SurveyModel.countDocuments({ status: "PUBLISHED" }),
      SurveyModel.countDocuments({ status: "DRAFT" }),

      SurveyModel.find().sort({ createdAt: -1 }).limit(5),

      ResponseModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("surveyId", "title"),

      SurveyModel.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            surveys: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),

      ResponseModel.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            responses: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const surveyTrend = surveyTrendRaw.map((item) => ({
      name: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      surveys: item.surveys,
    }));

    const responseTrend = responseTrendRaw.map((item) => ({
      name: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      responses: item.responses,
    }));

    return {
      totalUsers,
      totalSurveys,
      totalResponses,
      publishedSurveys,
      draftSurveys,
      surveyTrend,
      responseTrend,
      recentSurveys,
      recentResponses,
    };
  }
}
