import { DamageType } from "../../models/enums/DamageType";
import { DefenseType } from "../../models/enums/DefenseType";
import { Defense } from "../../models/interfaces/defense";

/**
 * Returns the defense type for a given damage type.
 * @param defenses - An array of defenses from a character.
 * @param damageType - The damage type to check for in the defenses array.
 * @returns first matching DefenseType - can be DefenseType.None
 */
export function checkDefenceAgainstDamageType(
  defenses: Defense[],
  damageType: DamageType,
): DefenseType {
  const matchingDefenses = defenses.filter((d) => d.type == damageType);
  return strongestDefenseType(matchingDefenses);
}

/**
 * Returns the strongest defense type for a given array of defenses.
 * @param defenses - An array of defenses from a character.
 * @returns strongest DefenseType included in the defenses array
 */
function strongestDefenseType(defenses: Defense[]): DefenseType {
  const defenseTypes: DefenseType[] = defenses.map((d) => d.defense);
  return defenseTypes.includes(DefenseType.Immunity)
    ? DefenseType.Immunity // Immunity is strongest
    : defenseTypes.includes(DefenseType.Resistance)
    ? DefenseType.Resistance // Resistance is next strongest
    : DefenseType.None; // None is weakest
}
