import { Request, Response } from "express";
import CharacterDb from "../../models/schema/CharacterSchema";
import { Character, HitPoints } from "../../models/interfaces/character";
import { DefenseType } from "../../models/enums/DefenseType";
import { checkDefenceAgainstDamageType } from "./checkDefenseAgainstDamageType";
import { calcAppliedDamage } from "./calcAppliedDamage";
import { extractHitpoints } from "../../utils/extractHitpoints";
import { damageHitPoints } from "./damageHitPoints";

export async function damageCharacter(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { damageType, damageAmount } = req.body;
    const damage = Number(damageAmount); // ideally would sanitize body with middleware

    // use .lean() to strip additional mongodb document properties
    // use conditional chaining in case of null value
    const character: Character | null = await CharacterDb.findById(id)?.lean();

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const defenseType: DefenseType = checkDefenceAgainstDamageType(character.defenses, damageType);
    const appliedDamage: number = calcAppliedDamage(damage, defenseType);
    const originalHitPoints: HitPoints = extractHitpoints(character);
    const newHitPoints: HitPoints = damageHitPoints(originalHitPoints, appliedDamage);

    const updatedCharacter: Character = { ...character, ...newHitPoints };
    await CharacterDb.findByIdAndUpdate(id, updatedCharacter);

    // return only relevant data
    return res.status(200).json({
      id: character._id,
      name: character.name,
      base_damage: damage,
      damage_recieved: appliedDamage,
      damage_type_recieved: damageType,
      defense_against_damage: defenseType,
      original_hit_points: originalHitPoints,
      updated_hit_points: newHitPoints,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went terribly wrong...", error });
  }
}
