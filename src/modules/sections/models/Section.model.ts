import mongoose, { Schema } from "mongoose";

const SectionSchema = new Schema(
  {
    surveyId: {
      type: Schema.Types.ObjectId,
      ref: "surveys",
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

export const SectionModel = mongoose.model("sections", SectionSchema);
