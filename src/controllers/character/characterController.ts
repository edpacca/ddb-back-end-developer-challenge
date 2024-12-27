import { Request, Response } from "express";
import Character from "../../db/repositoryInterface";

export async function createCharacter(req: Request, res: Response): Promise<Response> {
  try {
    const data = req.body;
    const newCharacter = await Character.createCharacter({ ...data });

    return res.status(201).json(newCharacter);
  } catch (error) {
    return res.status(500).json({ message: "Error creating character", error });
  }
}

export async function getCharacter(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const character = await Character.findCharacterById(id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    return res.status(200).json(character);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching character", error });
  }
}

export async function updateCharacter(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const updates = req.body;
    delete updates._id; // do not override _id

    const updatedCharacter = await Character.findCharacterByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }

    return res.status(200).json(updatedCharacter);
  } catch (error) {
    return res.status(500).json({ message: "Error updating character", error });
  }
}

export async function deleteCharacter(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    if (id === "briv") {
      return res.status(418).json({
        message:
          "If you think a mere DELETE request can delete Briv, then you are gravely mistaken. Briv cannot be deleted!",
      });
    }

    const deletedCharacter = await Character.findCharacterByIdAndDelete(id);

    if (!deletedCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }

    return res.status(200).json({ message: `Character with id: ${id} deleted successfully` });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting character", error });
  }
}
