import { Schema, model, Document } from "mongoose";

export interface IScreening extends Document {
  anonUserId?: string;
  phq9Total: number;
  gad7Total?: number;
  severity: string;
  createdAt: Date;
}

const screeningSchema = new Schema<IScreening>(
  {
    anonUserId: { type: String },
    phq9Total: { type: Number, required: true },
    gad7Total: { type: Number },
    severity: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Screening = model<IScreening>("Screening", screeningSchema);



