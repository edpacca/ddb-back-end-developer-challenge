import { calcAppliedDamage } from "../src/controllers/damage/calcAppliedDamage";
import { DefenseType } from "../src/models/enums/DefenseType";

describe("calcAppliedDamage", () => {
  it("should return the full damage amount when defense type is None", () => {
    const damageAmount = 20;
    const result = calcAppliedDamage(damageAmount, DefenseType.None);

    expect(result).toBe(20);
  });

  it("should return half the damage amount when passed an even number and defense type is Resistance", () => {
    const damageAmount = 200;
    const result = calcAppliedDamage(damageAmount, DefenseType.Resistance);

    expect(result).toBe(100);
  });

  it("should return half the damage amount rounded down when pased an odd number and defense type is Resistance", () => {
    const damageAmount = 25;
    const result = calcAppliedDamage(damageAmount, DefenseType.Resistance);

    expect(result).toBe(12); // Math.floor(25 / 2)
  });

  it("should return 0 when defense type is Immunity", () => {
    const damageAmount = 30;
    const result = calcAppliedDamage(damageAmount, DefenseType.Immunity);

    expect(result).toBe(0);
  });

  it("should always return 0 when passed a value of 0", () => {
    [DefenseType.Immunity, DefenseType.Resistance, DefenseType.None].forEach((defense) => {
      const result = calcAppliedDamage(0, defense);
      expect(result).toBe(0);
    });
  });

  it("should return 0 if a negative number is provided", () => {
    const damageAmount = -10;
    const result = calcAppliedDamage(damageAmount, DefenseType.Resistance);

    expect(result).toBe(0);
  });

  it("should handle an absurdly large number", () => {
    // eslint-disable-next-line no-loss-of-precision
    const damageAmount = 999999999999999999;
    const result = calcAppliedDamage(damageAmount, DefenseType.Resistance);

    expect(result).toBe(500000000000000000);
  });
});
