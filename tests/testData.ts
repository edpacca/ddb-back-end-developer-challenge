import { DamageType } from "../src/model/enum/DamageType";
import { DefenseType } from "../src/model/enum/DefenseType";
import { Character } from "../src/model/interface/character";

export const testCharacter: Character = {
  _id: "bill",
  name: "Bill the Pony",
  level: 7,
  hitPoints: 60,
  currentHitPoints: 40,
  tempHitPoints: 10,
  characterClasses: [
    {
      name: "paladin",
      hitDiceValue: 10,
      classLevel: 7,
    },
  ],
  stats: {
    strength: 18,
    dexterity: 10,
    constitution: 16,
    intelligence: 11,
    wisdom: 12,
    charisma: 20,
  },
  items: [
    {
      name: "Amulet of Health",
      modifier: {
        affectedObject: "stats",
        affectedValue: "constitution",
        value: 4,
      },
    },
    {
      name: "Sword of Vengeance",
      modifier: {
        affectedObject: "stats",
        affectedValue: "strength",
        value: 3,
      },
    },
  ],
  defenses: [
    {
      type: DamageType.Cold,
      defense: DefenseType.Resistance,
    },
    {
      type: DamageType.Necrotic,
      defense: DefenseType.Immunity,
    },
  ],
};
