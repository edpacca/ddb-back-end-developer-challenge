import { CharacterClass } from "./characterClass";
import { Defense } from "./defense";
import { Item } from "./item";
import { Stats } from "./stats";

export interface Character {
  name: string;
  level: number;
  hitPoints: number;
  currentHitPoints: number;
  tempHitPoints: number;
  characterClasses: CharacterClass[];
  stats: Stats;
  items: Item[];
  defenses: Defense[];
}
