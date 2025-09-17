import { ResourceProgress, IResourceProgress } from "../models/resourceProgress.model";

export class ResourceProgressService {
  async upsert(user: string, resourceId: string, status: "viewed" | "completed") {
    return await ResourceProgress.findOneAndUpdate(
      { user, resourceId },
      { status, updatedAt: new Date() },
      { upsert: true, new: true }
    );
  }

  async list(user: string) {
    return await ResourceProgress.find({ user }).sort({ updatedAt: -1 });
  }
}

export const resourceProgressService = new ResourceProgressService();


