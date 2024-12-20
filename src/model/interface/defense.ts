import { DamageType } from "../enum/DamageType";
import { DefenseType } from "../enum/DefenseType";

export interface Defense {
  type: DamageType;
  defense: DefenseType;
}
