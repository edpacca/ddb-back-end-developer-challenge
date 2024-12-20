import Character from "@model/schema/CharacterSchema";
import defaultCharacterData from "../data/briv.json";

export async function initialiseCharacterDb() {
  try {
    await Character.deleteMany({}); // Clear characters
    const newCharacter = await Character.create({
      ...defaultCharacterData,
      currentHitPoints: defaultCharacterData.hitPoints,
    });
    console.log(`Created new character: ${newCharacter.name}`);
  } catch (error) {
    console.error("error creating character", error);
  }
}
