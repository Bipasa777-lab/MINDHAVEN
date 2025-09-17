import { Schema, model, Document } from "mongoose";

export interface IResourceProgress extends Document {
  user: string; // email or user id
  resourceId: string; // Resource _id or external id
  status: "viewed" | "completed";
  updatedAt: Date;
}

const resourceProgressSchema = new Schema<IResourceProgress>(
  {
    user: { type: String, required: true, index: true },
    resourceId: { type: String, required: true, index: true },
    status: { type: String, enum: ["viewed", "completed"], required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

resourceProgressSchema.index({ user: 1, resourceId: 1 }, { unique: true });

export const ResourceProgress = model<IResourceProgress>(
  "ResourceProgress",
  resourceProgressSchema
);


