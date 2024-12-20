import { Request, Response, NextFunction } from "express";
import { isDamageType } from "../utils/isValidDamageType";
import { isStringPositiveInteger } from "../utils/isStringPositiveInteger";
import { DamageType } from "@model/enum/DamageType";

function validateDamageType(damageType: string): void {
  if (!isDamageType(damageType)) {
    throw new Error(`Invalid damage type. Valid types: ${Object.values(DamageType).join(", ")}`);
  }
}

function validateDamageAmount(damageAmount: string): void {
  if (!isStringPositiveInteger(damageAmount)) {
    throw new Error("Damage Amount must be a positive integer");
  }
}

export function validateDamageRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const { characterName, damageType, damageAmount } = req.body;
    if (!characterName || !damageAmount || !damageType) {
      throw new Error("Parameters must include: characterName, damageType, damageAmount");
    }
    validateDamageType(damageType);
    validateDamageAmount(damageAmount);
    return next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).send(error);
  }
}
