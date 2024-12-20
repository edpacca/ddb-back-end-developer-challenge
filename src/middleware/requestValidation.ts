import { Request, Response, NextFunction } from "express";
import { validateDamageType, validateIdInReqParams, validatePositiveInteger } from "./utils";

export function validateDamageRequest(req: Request, res: Response, next: NextFunction) {
  try {
    validateIdInReqParams(req);
    const { damageType, damageAmount } = req.body;
    if (!damageAmount || !damageType) {
      throw new Error("Parameters must include:  damageType, damageAmount");
    }
    validateDamageType(damageType);
    validatePositiveInteger(damageAmount);
    return next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).send(error);
  }
}

export function validateHealRequest(req: Request, res: Response, next: NextFunction) {
  try {
    validateIdInReqParams(req);
    const { healAmount } = req.body;
    if (!healAmount) {
      throw new Error("Request Body must include: healAmount");
    }
    validatePositiveInteger(healAmount);
    return next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).send(error);
  }
}

export function validateUpdateTempHitPointsRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    validateIdInReqParams(req);
    const { tempHitPointsAmount } = req.body;
    if (!tempHitPointsAmount) {
      throw new Error("Request Body must include: tempHitPointsAmount");
    }
    validatePositiveInteger(tempHitPointsAmount);
    return next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).send(error);
  }
}
