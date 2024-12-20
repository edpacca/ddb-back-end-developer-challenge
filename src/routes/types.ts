import { Request } from "express";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export type DamageRequestBody = TypedRequestBody<{
  characterName: string;
  damageAmount: number;
  damageType: string;
}>;
