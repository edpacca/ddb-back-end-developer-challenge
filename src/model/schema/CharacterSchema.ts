import { Schema, model } from "mongoose";
import { CharacterClassSchema } from "./CharacterClassSchema";
import { StatsSchema } from "./StatsSchema";
import { ItemSchema } from "./ItemSchema";
import { DefenseSchema } from "./DefenseSchema";
import { Character } from "../interface/character";

const CharacterSchema = new Schema<Character>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  hitPoints: { type: Number, required: true },
  currentHitPoints: {
    type: Number,
  },
  tempHitPoints: { type: Number, required: true, default: 10 },
  characterClasses: {
    type: [CharacterClassSchema],
    default: [],
    required: true,
  },
  stats: { type: StatsSchema, required: true },
  items: { type: [ItemSchema], default: [], required: true },
  defenses: { type: [DefenseSchema], default: [], required: true },
});

export default model("Character", CharacterSchema);
