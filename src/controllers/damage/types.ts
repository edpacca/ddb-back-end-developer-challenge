import { TypedRequestBody } from "../../types";

export type DamageRequestBody = TypedRequestBody<{
  characterId: string;
  damage: number;
  damageType: string;
}>;
