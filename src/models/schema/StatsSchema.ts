import { Schema } from "mongoose";
import { Stats } from "../interfaces/stats";

export const StatsSchema = new Schema<Stats>({
  strength: { type: Number, required: true },
  dexterity: { type: Number, required: true },
  constitution: { type: Number, required: true },
  intelligence: { type: Number, required: true },
  wisdom: { type: Number, required: true },
  charisma: { type: Number, required: true },
});
