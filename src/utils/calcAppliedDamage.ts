import { DefenseType } from "@model/enum/DefenseType";

/**
 * Calculates to amount of damage applied based on defenses
 * @param damageAmount - Initial amount of raw damage recieved.
 * @param defenseType - Defense type relative to the incoming damage.
 * @returns The damage to be applied after modifiers
 */
export function calcAppliedDamage(damageAmount: number, defenseType: DefenseType): number {
  switch (defenseType) {
    case DefenseType.None:
      return damageAmount;
    case DefenseType.Resistance:
      return Math.floor(damageAmount / 2);
    case DefenseType.Immunity:
      return 0;
  }
}
