import mongoose from "mongoose";

// Sub-schema for Stats
export const StatsSchema = new mongoose.Schema({
  strength: { type: Number, required: true },
  dexterity: { type: Number, required: true },
  constitution: { type: Number, required: true },
  intelligence: { type: Number, required: true },
  wisdom: { type: Number, required: true },
  charisma: { type: Number, required: true },
});
