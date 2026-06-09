import mongoose, { Schema } from "mongoose";

const SurveySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CLOSED"],
      default: "DRAFT",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    settings: {
      allowAnonymousResponses: {
        type: Boolean,
        default: true,
      },

      allowMultipleResponses: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SurveyModel = mongoose.model("surveys", SurveySchema);
