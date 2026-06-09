import mongoose, { Schema } from "mongoose";

const PasswordResetTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
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

export const PasswordResetTokenModel = mongoose.model(
  "password_reset_tokens",
  PasswordResetTokenSchema,
);
