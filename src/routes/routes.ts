import { Express, Response } from "express";
import { applyDamageToCharacter } from "../controllers/damageController";
import { validateDamageRequest } from "../middleware/validateDamageRequest";
import { DamageRequestBody } from "./types";

function appRouter(app: Express): void {
  app.post(
    "/damage",
    validateDamageRequest, // middleware validates incoming data
    async (req: DamageRequestBody, res: Response) => {
      return applyDamageToCharacter(req, res);
    },
  );
}

export default appRouter;
