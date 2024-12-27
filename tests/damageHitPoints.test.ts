import { HitPoints } from "../src/models/interfaces/character";
import { damageHitPoints } from "../src/controllers/damage/damageHitPoints";

describe("damageHitPoints", () => {
  it("should apply damage to tempHitPoints first, then currentHitPoints", () => {
    const hitPoints: HitPoints = {
      hitPoints: 50,
      currentHitPoints: 50,
      tempHitPoints: 10,
    };
    const damage = 15;
    const result = damageHitPoints(hitPoints, damage);

    expect(result.tempHitPoints).toBe(0); // 10 - 15 = -5
    expect(result.currentHitPoints).toBe(45); // 50 - (15 - 10) = 45
    expect(result.hitPoints).toBe(50);
  });

  it("should not affect currentHitPoints when appliedDamage is less than tempHitPoints", () => {
    const hitPoints: HitPoints = {
      hitPoints: 50,
      currentHitPoints: 50,
      tempHitPoints: 20,
    };
    const damage = 10;
    const result = damageHitPoints(hitPoints, damage);

    expect(result.tempHitPoints).toBe(10); // 20 - 10 = 10
    expect(result.currentHitPoints).toBe(50); // No damage to currentHitPoints
    expect(result.hitPoints).toBe(50);
  });

  it("should not reduce currentHitPoints below 0 when appliedDamage exceeds currentHitPoints", () => {
    const hitPoints: HitPoints = {
      hitPoints: 50,
      currentHitPoints: 20,
      tempHitPoints: 5,
    };
    const damage = 50;
    const result = damageHitPoints(hitPoints, damage);

    expect(result.tempHitPoints).toBe(0); // 5 - 50 = 0
    expect(result.currentHitPoints).toBe(0); // 20 - (50 - 5) = 0
    expect(result.hitPoints).toBe(50);
  });

  it("should return the original hitPoints when no damage is applied", () => {
    const hitPoints: HitPoints = {
      hitPoints: 50,
      currentHitPoints: 50,
      tempHitPoints: 10,
    };
    const damage = 0;
    const result = damageHitPoints(hitPoints, damage);

    expect(result.tempHitPoints).toBe(10);
    expect(result.currentHitPoints).toBe(50);
    expect(result.hitPoints).toBe(50);
  });

  it("should handle edge case where tempHitPoints and currentHitPoints are both 0", () => {
    const hitPoints: HitPoints = {
      hitPoints: 50,
      currentHitPoints: 0,
      tempHitPoints: 0,
    };
    const damage = 10;
    const result = damageHitPoints(hitPoints, damage);

    expect(result.tempHitPoints).toBe(0);
    expect(result.currentHitPoints).toBe(0);
    expect(result.hitPoints).toBe(50);
  });

  it("should return the original hitPoints if provided a negative number for applied damage", () => {
    const hitPoints: HitPoints = {
      hitPoints: 50,
      currentHitPoints: 50,
      tempHitPoints: 10,
    };
    const damage = -10;
    const result = damageHitPoints(hitPoints, damage);
    expect(result).toBe(hitPoints);
  });

  it("should reduce the temp and current hitPoints to 0 if damage exceeds total of both values", () => {
    const hitPoints: HitPoints = {
      hitPoints: 50,
      currentHitPoints: 50,
      tempHitPoints: 10,
    };
    const damage = 500;
    const result = damageHitPoints(hitPoints, damage);
    expect(result.tempHitPoints).toBe(0);
    expect(result.currentHitPoints).toBe(0);
    expect(result.hitPoints).toBe(50);
  });

  it("should handle an absurdly large number", () => {
    const hitPoints: HitPoints = {
      hitPoints: 50,
      currentHitPoints: 50,
      tempHitPoints: 10,
    };
    // eslint-disable-next-line no-loss-of-precision
    const damage = 9999999999999999999999999999;
    const result = damageHitPoints(hitPoints, damage);
    expect(result.tempHitPoints).toBe(0);
    expect(result.currentHitPoints).toBe(0);
    expect(result.hitPoints).toBe(50);
  });
});
