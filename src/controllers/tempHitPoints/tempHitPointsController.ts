import { Request, Response } from "express";
import CharacterDb from "../../model/schema/CharacterSchema";
import { Character } from "../../model/interface/character";

export async function updateCharacterTempHitpoints(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { tempHitPointsAmount } = req.body;

    // use .lean() to strip additional mongodb document properties
    const character: Character | null = await CharacterDb.findById(id).lean();

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const originalTempHitPoints = character.tempHitPoints;
    const newTemptHitPoints = Math.max(originalTempHitPoints, tempHitPointsAmount);

    const updatedCharacter: Character = { ...character, tempHitPoints: newTemptHitPoints };
    await CharacterDb.findByIdAndUpdate(id, { ...updatedCharacter });

    // return only relevant data
    return res.status(200).json({
      id: character._id,
      name: character.name,
      tempHitPointsGiven: tempHitPointsAmount,
      originalTempHitPoints: originalTempHitPoints,
      newTemptHitPoints: newTemptHitPoints,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went terribly wrong...", error });
  }
}
