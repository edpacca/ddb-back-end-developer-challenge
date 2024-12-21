import { Express, Response } from "express";
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

function appRouter(app: Express): void {
  app.post(
    "/characters/:id/damage",
    validateDamageRequest, // custom middleware validates incoming data
    async (req: DamageRequestBody, res: Response) => {
      return damageCharacter(req, res);
    },
  );

  app.post(
    "/characters/:id/heal",
    validateHealRequest, // custom middleware validates incoming data
    async (req: HealRequestBody, res: Response) => {
      return healCharacter(req, res);
    },
  );

  // POST not PUT as might not actually update if current TempHP is higher than request value
  app.post(
    "/characters/:id/temphp",
    validateUpdateTempHitPointsRequest, // custom middleware validates incoming data
    async (req: UpdateTempHitPointsRequestBody, res: Response) => {
      return updateCharacterTempHitpoints(req, res);
    },
  );

  // EJP: No validation on character data due to time contstraints and scope
  app.post("/characters/:id", async (req: CreateCharacterRequestBody, res: Response) => {
    await createCharacter(req, res);
  });

  app.get("/characters/:id", async (req: EmptyRequestBody, res: Response) => {
    await getCharacter(req, res);
  });

  app.put("/characters/:id", async (req: UpdateCharacterRequestBody, res: Response) => {
    await updateCharacter(req, res);
  });

  app.delete("/characters/:id", async (req: EmptyRequestBody, res: Response) => {
    await deleteCharacter(req, res);
  });
}

export default appRouter;
