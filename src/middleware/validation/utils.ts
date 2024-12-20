import { Request } from "express";
import { DamageType } from "../../model/enum/DamageType";
import { isStringPositiveInteger } from "../../utils/isStringPositiveInteger";
import { isDamageType } from "../../utils/isValidDamageType";

/**
 * Validates that the request parameters include an `id`.
 * @param req - The Express request object.
 * @throws Error if the `id` parameter is not present in the request.
 */
export function validateIdInReqParams(req: Request): void {
  const { id } = req.params;
  if (!id) {
    throw new Error("Parameters must include id");
  }
}

/**
 * Validates that the provided damage type is a valid value from the `DamageType` enum.
 * @param damageType - The damage type string to validate.
 * @throws Error if the damage type is not a valid `DamageType`.
 */
export function validateDamageType(damageType: string): void {
  if (!isDamageType(damageType)) {
    throw new Error(`Invalid damage type. Valid types: ${Object.values(DamageType).join(", ")}`);
  }
}

/**
 * Validates that the provided string represents a positive integer.
 * @param damageAmount - The string representing the damage amount to validate.
 * @throws Error if the string is not a positive integer.
 */
export function validatePositiveInteger(damageAmount: string): void {
  if (!isStringPositiveInteger(damageAmount)) {
    throw new Error("Damage Amount must be a positive integer");
  }
}
