import { Router } from "express";
import { resourceController } from "./controllers/resource.controller";
import { listProgress, upsertProgress } from "./controllers/resourceProgress.controller";

const router = Router();

router.get("/", resourceController.getAll);
router.get("/:id", resourceController.getById);
router.post("/", resourceController.create);
router.put("/:id", resourceController.update);
router.delete("/:id", resourceController.delete);

// Progress tracking
router.get("/progress/list", listProgress);
router.post("/progress", upsertProgress);

export default router;
