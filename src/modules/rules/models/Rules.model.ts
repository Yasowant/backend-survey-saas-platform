import mongoose, { Schema } from "mongoose";

const RuleSchema = new Schema(
  {
    surveyId: {
      type: Schema.Types.ObjectId,
      ref: "surveys",
      required: true,
    },

    sourceQuestionId: {
      type: Schema.Types.ObjectId,
      ref: "questions",
      required: true,
    },

    targetQuestionId: {
      type: Schema.Types.ObjectId,
      ref: "questions",
      default: null,
    },

    targetSectionId: {
      type: Schema.Types.ObjectId,
      ref: "sections",
      default: null,
    },

    operator: {
      type: String,
      enum: [
        "EQUALS",
        "NOT_EQUALS",
        "GREATER_THAN",
        "LESS_THAN",
        "CONTAINS",
        "NOT_CONTAINS",
        "IS_EMPTY",
        "IS_NOT_EMPTY",
      ],
      required: true,
    },

    value: {
      type: Schema.Types.Mixed,
      required: true,
    },

    action: {
      type: String,
      enum: ["SHOW", "HIDE", "REQUIRE", "OPTIONAL", "ENABLE", "DISABLE"],
      required: true,
    },

    order: {
      type: Number,
      default: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RuleModel =
  mongoose.models.rules || mongoose.model("rules", RuleSchema);
