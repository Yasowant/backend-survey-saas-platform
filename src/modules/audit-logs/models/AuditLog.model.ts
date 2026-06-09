import mongoose, { Schema } from "mongoose";

const AuditLogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    entityType: {
      type: String,
      required: true,
    },

    entityId: {
      type: String,
      required: true,
    },

    oldValue: {
      type: Schema.Types.Mixed,
      default: null,
    },

    newValue: {
      type: Schema.Types.Mixed,
      default: null,
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const AuditLogModel = mongoose.model("audit_logs", AuditLogSchema);
