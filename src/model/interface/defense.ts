import { DamageType } from "../enum/DamageType";
import { DefenseType } from "../enum/DefenseType";

export interface Defense {
  type: DamageType; // EJP: name 'type' is not ideal for a property - ideally rename
  defense: DefenseType;
}
