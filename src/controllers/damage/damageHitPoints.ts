import { HitPoints } from "../../models/interfaces/character";

/**
 * Takes a HitPoints obejct and updates with damage
 * First applies to tempHitPoints, then applies to currentHitPoints
 * @param HitPoints - instance of HitPoints object
 * @param appliedDamage - damage to be applied.
 * @returns a new HitPoints object with updated values.
 */
export function damageHitPoints(hitPoints: HitPoints, appliedDamage: number): HitPoints {
  if (appliedDamage <= 0) {
    return hitPoints;
  }

  const directDamage = Math.max(0, appliedDamage - hitPoints.tempHitPoints);
  const newTempHitPoints = Math.max(0, hitPoints.tempHitPoints - appliedDamage);
  const newCurrentHitPoints = Math.max(0, hitPoints.currentHitPoints - directDamage);

  return {
    hitPoints: hitPoints.hitPoints,
    currentHitPoints: newCurrentHitPoints,
    tempHitPoints: newTempHitPoints,
  };
}
