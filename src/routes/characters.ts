import { Router, Response } from "express";
import {
  validateDamageRequest,
  validateHealRequest,
  validateUpdateTempHitPointsRequest,
} from "../middleware/requestValidation";
import { healCharacter } from "../controllers/heal/healController";
import { damageCharacter } from "../controllers/damage/damageController";
import { updateCharacterTempHitpoints } from "../controllers/tempHitPoints/tempHitPointsController";
import {
  CreateCharacterRequestBody,
  DamageRequestBody,
  EmptyRequestBody,
  HealRequestBody,
  UpdateCharacterRequestBody,
  UpdateTempHitPointsRequestBody,
} from "./types";
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  updateCharacter,
} from "../controllers/character/characterController";

const router = Router();

router.post(
  "/:id/damage",
  validateDamageRequest, // custom middleware validates incoming data
  async (req: DamageRequestBody, res: Response) => {
    return damageCharacter(req, res);
  },
);

router.post(
  "/:id/heal",
  validateHealRequest, // custom middleware validates incoming data
  async (req: HealRequestBody, res: Response) => {
    return healCharacter(req, res);
  },
);

// POST not PUT as might not actually update if current TempHP is higher than request value
router.post(
  "/:id/temphp",
  validateUpdateTempHitPointsRequest, // custom middleware validates incoming data
  async (req: UpdateTempHitPointsRequestBody, res: Response) => {
    return updateCharacterTempHitpoints(req, res);
  },
);

// EJP: No validation on character data due to time contstraints and scope
router.post("/:id", async (req: CreateCharacterRequestBody, res: Response) => {
  await createCharacter(req, res);
});

router.get("/:id", async (req: EmptyRequestBody, res: Response) => {
  await getCharacter(req, res);
});

router.put("/:id", async (req: UpdateCharacterRequestBody, res: Response) => {
  await updateCharacter(req, res);
});

router.delete("/:id", async (req: EmptyRequestBody, res: Response) => {
  await deleteCharacter(req, res);
});

export default router;
