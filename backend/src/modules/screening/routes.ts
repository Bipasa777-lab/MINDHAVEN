import { Router } from "express";
import { createScreening, listScreenings } from "./controllers/screening.controller";

const router = Router();

// POST /api/screenings
router.post("/", createScreening);

// GET /api/screenings?anonUserId=...
router.get("/", listScreenings);

export default router;



