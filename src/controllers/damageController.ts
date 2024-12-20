import { Request, Response } from "express";
import CharacterDb from "@model/schema/CharacterSchema";
import { Character } from "@model/interface/character";
import { DefenseType } from "@model/enum/DefenseType";
import { checkDefenceAgainstDamageType } from "../utils/checkDefenseAgainstDamageType";
import { calcAppliedDamage } from "../utils/calcAppliedDamage";

export async function applyDamageToCharacter(req: Request, res: Response): Promise<Response> {
  try {
    const { characterName, damageType, damageAmount } = req.body;

    // use .lean() to strip additional mongodb document properties
    const character: Character | null = await CharacterDb.findOne({
      name: characterName,
    }).lean();

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const defenseType: DefenseType = checkDefenceAgainstDamageType(character.defenses, damageType);
    const appliedDamage: number = calcAppliedDamage(damageAmount, defenseType);
    const updatedCharacter: Character = applyDamageToCopiedCharacter(character, appliedDamage);

    await CharacterDb.findOneAndUpdate({ name: character.name }, { ...updatedCharacter });

    return res.status(200).json(updatedCharacter);
  } catch (error) {
    return res.status(500).json({ message: "Something went terribly wrong...", error });
  }
}

/**
 * Returns a copy of the character object with damage applied.
 * First applies to tempHitPoints, then applies to currentHitPoints
 * @param character - instance of Character object
 * @param appliedDamage - damage to be applied.
 * @returns a copy of the character object with updated currentHitPoints and tempHitPoints.
 */
function applyDamageToCopiedCharacter(character: Character, appliedDamage: number): Character {
  const directDamage = Math.max(0, appliedDamage - character.tempHitPoints);
  const newTempHitPoints = Math.max(0, character.tempHitPoints - appliedDamage);
  const newCurrentHitPoints = Math.max(0, character.currentHitPoints - directDamage);

  return {
    ...character,
    currentHitPoints: newCurrentHitPoints,
    tempHitPoints: newTempHitPoints,
  };
}
