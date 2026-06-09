import mongoose, { Schema } from "mongoose";

const AnswerSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "questions",
      required: true,
    },

    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const ResponseSchema = new Schema(
  {
    surveyId: {
      type: Schema.Types.ObjectId,
      ref: "surveys", // ✅ STRING
      required: true,
    },

    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },

    answers: [AnswerSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ResponseModel =
  mongoose.models.responses || mongoose.model("responses", ResponseSchema);
