import { Request, Response } from "express";
import Character from "../../model/schema/CharacterSchema";

// Get a character by ID
export const getCharacter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    return res.status(200).json(character);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching character", error });
  }
};

// Update a character by ID
export const updateCharacter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCharacter = await Character.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }

    return res.status(200).json(updatedCharacter);
  } catch (error) {
    return res.status(500).json({ message: "Error updating character", error });
  }
};

// Delete a character by ID
export const deleteCharacter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedCharacter = await Character.findByIdAndDelete(id);

    if (!deletedCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }

    return res.status(200).json({ message: "Character deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting character", error });
  }
};
