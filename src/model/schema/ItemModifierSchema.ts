import mongoose from "mongoose";

// Sub-schema for Modifier
export const ItemModifierSchema = new mongoose.Schema({
  affectedObject: { type: String, required: true },
  affectedValue: { type: String, required: true },
  value: { type: Number, required: true },
});
