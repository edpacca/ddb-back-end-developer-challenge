import { Request } from "express";
import { Character } from "../models/interfaces/character";

export interface DamageRequest {
  damageAmount: number;
  damageType: string;
}

export interface HealRequest {
  healAmount: number;
}

export interface UpdateTempHitPointsRequest {
  tempHitPointAmount: number;
}

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export type DamageRequestBody = TypedRequestBody<DamageRequest>;

export type HealRequestBody = TypedRequestBody<HealRequest>;

// EJP: verbose, but I avoid using acronyms in function names
export type UpdateTempHitPointsRequestBody = TypedRequestBody<UpdateTempHitPointsRequest>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type EmptyRequestBody = TypedRequestBody<{}>;

export type UpdateCharacterRequestBody = TypedRequestBody<{ data: Character }>;

export type CreateCharacterRequestBody = TypedRequestBody<{ data: Character }>;
