import mongoose, { Schema } from "mongoose";

const EmailVerificationTokenSchema = new Schema(
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

export const EmailVerificationTokenModel = mongoose.model(
  "email_verification_tokens",
  EmailVerificationTokenSchema,
);
