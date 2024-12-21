import { DefenseType } from "../../models/enums/DefenseType";

/**
 * Calculates to amount of damage applied based on defenses
 * @param damageAmount - Initial amount of raw damage recieved.
 * @param defenseType - Defense type relative to the incoming damage.
 * @returns number: The damage to be applied after modifiers
 */
export function calcAppliedDamage(damageAmount: number, defenseType: DefenseType): number {
  if (damageAmount < 0) {
    return 0;
  }

  switch (defenseType) {
    case DefenseType.None:
      return damageAmount;
    case DefenseType.Resistance:
      return Math.floor(damageAmount / 2);
    case DefenseType.Immunity:
      return 0;
  }
}
