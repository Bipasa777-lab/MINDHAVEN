import { Request, Response } from "express";
import { resourceProgressService } from "../services/resourceProgress.service";

export const upsertProgress = async (req: Request, res: Response) => {
  try {
    const { user, resourceId, status } = req.body as {
      user: string;
      resourceId: string;
      status: "viewed" | "completed";
    };
    if (!user || !resourceId || !status) {
      return res.status(400).json({ message: "user, resourceId, status required" });
    }
    const doc = await resourceProgressService.upsert(user, resourceId, status);
    return res.status(200).json(doc);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const listProgress = async (req: Request, res: Response) => {
  try {
    const user = req.query.user as string;
    if (!user) return res.status(400).json({ message: "user query required" });
    const docs = await resourceProgressService.list(user);
    return res.json(docs);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};


