import { healHitPoints } from "../src/controllers/heal/healHitPoints";
import { HitPoints } from "../src/model/interface/character";

describe("healHitPoints", () => {
  it("should increase currentHitPoints by the appliedHealing if it does not exceed maximum", () => {
    const hitPoints: HitPoints = {
      hitPoints: 100,
      currentHitPoints: 50,
      tempHitPoints: 0,
    };

    const result = healHitPoints(hitPoints, 30);

    expect(result.currentHitPoints).toBe(80); // 50 + 30 = 80
    expect(result.tempHitPoints).toBe(0); // tempHitPoints remain unchanged
    expect(result.hitPoints).toBe(100); // max hitPoints remain unchanged
  });

  it("should increase currentHitPoints without exceeding maximum hitPoints", () => {
    const hitPoints: HitPoints = {
      hitPoints: 100,
      currentHitPoints: 80,
      tempHitPoints: 10,
    };

    const result = healHitPoints(hitPoints, 30);

    expect(result.currentHitPoints).toBe(100); // 80 + 30 = 110 -> 100
    expect(result.tempHitPoints).toBe(10); // tempHitPoints remain unchanged
    expect(result.hitPoints).toBe(100); // max hitPoints remain unchanged
  });

  it("should return original hitpoints if appliedHealing is 0", () => {
    const hitPoints: HitPoints = {
      hitPoints: 100,
      currentHitPoints: 50,
      tempHitPoints: 10,
    };

    const result = healHitPoints(hitPoints, 0);
    expect(result).toBe(hitPoints);
  });

  it("should return same hitpoints when currentHitPoints equals hitPoints", () => {
    const hitPoints: HitPoints = {
      hitPoints: 100,
      currentHitPoints: 100,
      tempHitPoints: 5,
    };

    const result = healHitPoints(hitPoints, 20);

    expect(result.currentHitPoints).toBe(100); // Already at max hitPoints
    expect(result.tempHitPoints).toBe(5); // tempHitPoints remain unchanged
    expect(result.hitPoints).toBe(100); // max hitPoints remain unchanged
  });

  it("should return original hitpoints if negative value is provided", () => {
    const hitPoints: HitPoints = {
      hitPoints: 100,
      currentHitPoints: 50,
      tempHitPoints: 0,
    };

    const result = healHitPoints(hitPoints, -10);
    expect(result).toBe(hitPoints);
  });
});
