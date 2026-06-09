import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema(
  {
    surveyId: {
      type: Schema.Types.ObjectId,
      ref: "surveys",
      required: true,
    },

    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "sections",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      required: true,
    },

    required: {
      type: Boolean,
      default: false,
    },

    options: [
      {
        type: String,
      },
    ],

    placeholder: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const QuestionModel =
  mongoose.models.questions || mongoose.model("questions", QuestionSchema);
