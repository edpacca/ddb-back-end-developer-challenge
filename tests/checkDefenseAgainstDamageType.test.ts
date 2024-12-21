import { checkDefenceAgainstDamageType } from "../src/controllers/damage/checkDefenseAgainstDamageType";
import { DamageType } from "../src/models/enums/DamageType";
import { DefenseType } from "../src/models/enums/DefenseType";
import { Defense } from "../src/models/interfaces/defense";

const testDefenses: Defense[] = [
  {
    type: DamageType.Acid,
    defense: DefenseType.Immunity,
  },
  {
    type: DamageType.Cold,
    defense: DefenseType.Resistance,
  },
  {
    type: DamageType.Force,
    defense: DefenseType.None,
  },
];

describe("checkDefenseAgainstDamageType", () => {
  it("Should return the correct DefenseType when a matching DamageType is found", () => {
    const acidDefense: DefenseType = checkDefenceAgainstDamageType(testDefenses, DamageType.Acid);
    const coldDefense: DefenseType = checkDefenceAgainstDamageType(testDefenses, DamageType.Cold);
    const forceDefense: DefenseType = checkDefenceAgainstDamageType(testDefenses, DamageType.Force);
    expect(acidDefense).toBe(DefenseType.Immunity);
    expect(coldDefense).toBe(DefenseType.Resistance);
    expect(forceDefense).toBe(DefenseType.None);
  });

  it("Should return DefenseType.None when no matching DamageType is found", () => {
    const fireDefense: DefenseType = checkDefenceAgainstDamageType(testDefenses, DamageType.Fire);
    expect(fireDefense).toBe(DefenseType.None);
  });

  it("Should return DefenseType.None when passed an empty array", () => {
    const noDefense: DefenseType = checkDefenceAgainstDamageType([], DamageType.Fire);
    expect(noDefense).toBe(DefenseType.None);
  });

  describe("Returns the strongest when multiple defense types are present", () => {
    const coldImmune = {
      type: DamageType.Cold,
      defense: DefenseType.Immunity,
    };
    const coldResistant = {
      type: DamageType.Cold,
      defense: DefenseType.Resistance,
    };
    const coldNone = {
      type: DamageType.Cold,
      defense: DefenseType.None,
    };

    it("should always return Immunity if DamageType is matching and Immunity is present", () => {
      const defenseTypesWithImmunity = [
        [coldImmune, coldResistant, coldNone],
        [coldImmune, coldResistant],
        [coldImmune, coldNone],
      ];

      defenseTypesWithImmunity.forEach((defenseArray) => {
        const result = checkDefenceAgainstDamageType(defenseArray, DamageType.Cold);
        expect(result).toEqual(DefenseType.Immunity);
      });
    });

    it("should return Resistant if DamageType matches and  Immunity is not present", () => {
      const result = checkDefenceAgainstDamageType([coldResistant, coldNone], DamageType.Cold);
      expect(result).toEqual(DefenseType.Resistance);
    });
  });
});
