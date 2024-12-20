import { Character, HitPoints } from "../model/interface/character";

/**
 * Takes an object matching Character interface
 * and extracts properties matching with the HitPoints interface
 * @param character - The Character object to filter parameters from.
 * @returns object matchign HitPoints interface
 */
export function extractHitpoints(character: Character): HitPoints {
  return {
    hitPoints: character.hitPoints,
    currentHitPoints: character.currentHitPoints,
    tempHitPoints: character.tempHitPoints,
  };
}
