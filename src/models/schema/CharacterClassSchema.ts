import { Schema } from "mongoose";
import { CharacterClass } from "../interfaces/characterClass";

export const CharacterClassSchema = new Schema<CharacterClass>({
  name: { type: String, required: true },
  hitDiceValue: { type: Number, required: true },
  classLevel: { type: Number, required: true },
});
