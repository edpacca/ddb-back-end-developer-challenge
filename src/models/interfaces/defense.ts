import { DamageType } from "../enums/DamageType";
import { DefenseType } from "../enums/DefenseType";

export interface Defense {
  type: DamageType; // EJP: name 'type' is not ideal for a property - ideally rename
  defense: DefenseType;
}
