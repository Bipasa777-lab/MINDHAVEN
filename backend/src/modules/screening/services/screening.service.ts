import { Screening, IScreening } from "../models/screening.model";

export class ScreeningService {
  async create(data: Partial<IScreening>) {
    const doc = new Screening(data);
    return await doc.save();
  }

  async listByUser(anonUserId?: string) {
    const filter = anonUserId ? { anonUserId } : {};
    return await Screening.find(filter).sort({ createdAt: -1 });
  }
}

export const screeningService = new ScreeningService();



