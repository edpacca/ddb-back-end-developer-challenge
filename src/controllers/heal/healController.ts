import { Request, Response } from "express";
import CharacterDb from "../../models/schema/CharacterSchema";
import { Character, HitPoints } from "../../models/interfaces/character";
import { extractHitpoints } from "../../utils/extractHitpoints";
import { healHitPoints } from "./healHitPoints";

export async function healCharacter(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { healAmount } = req.body;
    const healing = Number(healAmount); // ideally would sanitize body with middleware

    // use .lean() to strip additional mongodb document properties
    // use conditional chaining in case of null value
    const character: Character | null = await CharacterDb.findById(id)?.lean();

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const originalHitPoints: HitPoints = extractHitpoints(character);
    const updatedHitpoints: HitPoints = healHitPoints(originalHitPoints, healing);

    const updatedCharacter: Character = { ...character, ...updatedHitpoints };
    await CharacterDb.findByIdAndUpdate(id, { ...updatedCharacter });

    // return only relevant data
    return res.status(200).json({
      id: character._id,
      name: character.name,
      healing: healing,
      original_hit_points: originalHitPoints,
      updated_hit_points: updatedHitpoints,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went terribly wrong...", error });
  }
}
