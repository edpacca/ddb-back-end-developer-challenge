import { Express, Response } from "express";
import { postDamage } from "../controllers/damage/damageController";
import { DamageRequestBody } from "../controllers/damage/types";

function appRouter(app: Express): void {
  app.post("/damage", (request: DamageRequestBody, response: Response) => {
    return postDamage(request, response);
  });
}

export default appRouter;
