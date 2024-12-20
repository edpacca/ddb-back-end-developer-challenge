import mongoose from "mongoose";
import { ClassSchema } from "./ClassSchema";
import { StatsSchema } from "./StatsSchema";
import { ItemSchema } from "./ItemSchema";
import { DefenseSchema } from "./DefenseSchema";

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  hitPoints: { type: Number, required: true },
  classes: { type: [ClassSchema], default: [], required: true },
  stats: { type: StatsSchema, required: true },
  items: { type: [ItemSchema], default: [], required: true },
  defenses: { type: [DefenseSchema], default: [], required: true },
});

export default mongoose.model("Character", CharacterSchema);
