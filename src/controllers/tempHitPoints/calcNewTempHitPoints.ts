// in its own function to allow for updating logic if required
export function calcNewTempHitPoints(currentTempHitPoints: number, requestedTempHitPoints: number) {
  return Math.max(currentTempHitPoints, requestedTempHitPoints);
}
