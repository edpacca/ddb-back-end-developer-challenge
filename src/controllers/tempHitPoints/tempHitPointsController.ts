import { Request, Response } from "express";
import { Character } from "../../models/interfaces/character";
import { calcNewTempHitPoints } from "./calcNewTempHitPoints";
import CharacterDb from "../../db/repositoryInterface";

export async function updateCharacterTempHitpoints(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { tempHitPointsAmount } = req.body;
    const tempHitPoints = Number(tempHitPointsAmount); // ideally would sanitize body with middleware

    const character: Character | null | undefined = await CharacterDb.findCharacterById(id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const originalTempHitPoints = character.tempHitPoints;
    const updatedTempHitPoints = calcNewTempHitPoints(originalTempHitPoints, tempHitPoints);

    const updatedCharacter: Character = { ...character, tempHitPoints: updatedTempHitPoints };
    await CharacterDb.findCharacterByIdAndUpdate(id, { ...updatedCharacter });

    // return only relevant data
    return res.status(200).json({
      id: character._id,
      name: character.name,
      temp_hit_points_applied: tempHitPoints,
      original_temp_hit_points: originalTempHitPoints,
      updated_temp_hit_points: updatedTempHitPoints,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went terribly wrong...", error });
  }
}
