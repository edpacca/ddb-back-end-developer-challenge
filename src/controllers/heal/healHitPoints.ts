import { HitPoints } from "../../model/interface/character";

/**
 * Takes a HitPoints obejct and updates with healing
 * Applies to currentHitPoints and does not exceed maximum hitPoints
 * @param HitPoints - instance of HitPoints object
 * @param appliedHealing - healing to be applied.
 * @returns a new HitPoints object with updated values.
 */
export function healHitPoints(hitPoints: HitPoints, appliedHealing: number): HitPoints {
  if (appliedHealing <= 0) {
    return hitPoints;
  }

  const newCurrentHitPoints = Math.min(
    hitPoints.hitPoints,
    hitPoints.currentHitPoints + appliedHealing,
  );

  return {
    hitPoints: hitPoints.hitPoints,
    currentHitPoints: newCurrentHitPoints,
    tempHitPoints: hitPoints.tempHitPoints,
  };
}
