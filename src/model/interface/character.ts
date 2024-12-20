import { CharacterClass } from "./characterClass";
import { Defense } from "./defense";
import { Item } from "./item";
import { Stats } from "./stats";

export interface HitPoints {
  hitPoints: number;
  currentHitPoints: number;
  tempHitPoints: number;
}

export interface Character extends HitPoints {
  _id: string;
  name: string;
  level: number;
  characterClasses: CharacterClass[];
  stats: Stats;
  items: Item[];
  defenses: Defense[];
}
