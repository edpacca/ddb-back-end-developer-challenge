import { DamageType } from "@model/enum/DamageType";

/**
 * Check if a string is a valid value in the DamageType enum.
 * @param input - The string to check.
 * @returns True if the string is a valid DamageType, false otherwise.
 */
export function isDamageType(input: string): boolean {
  return Object.values(DamageType).includes(input as DamageType);
}
