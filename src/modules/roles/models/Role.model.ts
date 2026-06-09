import mongoose, { Schema } from "mongoose";
import "./Permission.model";

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "permissions",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RoleModel = mongoose.model("roles", RoleSchema);
