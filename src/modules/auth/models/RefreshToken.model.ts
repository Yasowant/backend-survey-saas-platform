import mongoose, { Schema } from "mongoose";

const RefreshTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    token: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RefreshTokenModel = mongoose.model(
  "refresh_tokens",
  RefreshTokenSchema,
);
