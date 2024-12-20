import { DamageType } from "@model/enum/DamageType";
import { DefenseType } from "@model/enum/DefenseType";
import { Defense } from "@model/interface/defense";

/**
 * Returns the defense type for a given damage type.
 * @param defenses - An array of defenses from a character.
 * @param damageType - The damage type to check for in the defenses array.
 * @returns The corresponding DefenseType if found, otherwise undefined.
 */
export function checkDefenceAgainstDamageType(
  defenses: Defense[],
  damageType: DamageType,
): DefenseType {
  const defense = defenses.find((d) => d.type == damageType);
  return defense ? defense.defense : DefenseType.None;
}
