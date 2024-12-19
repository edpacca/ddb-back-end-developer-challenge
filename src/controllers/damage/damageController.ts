import { Request, Response } from "express";
import config from "../../config";

export async function postDamage(request: Request, response: Response) {
  try {
    // const { characterId, damageType, damage } = request.body;

    return response.status(200);
  } catch (error) {
    if (config.debug) {
      console.log(error);
    }
    return response.status(500);
  }
}
