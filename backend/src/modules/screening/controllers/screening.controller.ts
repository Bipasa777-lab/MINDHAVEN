import { Request, Response } from "express";
import { screeningService } from "../services/screening.service";

export const createScreening = async (req: Request, res: Response) => {
  try {
    const created = await screeningService.create(req.body);
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || "Create failed" });
  }
};

export const listScreenings = async (req: Request, res: Response) => {
  try {
    const items = await screeningService.listByUser(req.query.anonUserId as string | undefined);
    return res.json(items);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};



