import { Request, Response } from "express";
import CharacterDb from "../src/models/schema/CharacterSchema";
import { damageCharacter } from "../src/controllers/damage/damageController";
import { checkDefenceAgainstDamageType } from "../src/controllers/damage/checkDefenseAgainstDamageType";
import { extractHitpoints } from "../src/utils/extractHitpoints";
import { damageHitPoints } from "../src/controllers/damage/damageHitPoints";
import { DamageType } from "../src/models/enums/DamageType";
import { DefenseType } from "../src/models/enums/DefenseType";
import { HitPoints } from "../src/models/interfaces/character";
import { testCharacter } from "./testData";
import { calcAppliedDamage } from "../src/controllers/damage/calcAppliedDamage";

jest.mock("../src/models/schema/CharacterSchema");
jest.mock("../src/controllers/damage/checkDefenseAgainstDamageType");
jest.mock("../src/controllers/damage/calcAppliedDamage");
jest.mock("../src/controllers/damage/damageHitPoints");
jest.mock("../src/utils/extractHitpoints");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockRequest = (params: any, body: any): Partial<Request> => ({
  params,
  body,
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("damageCharacter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 if the character is not found", async () => {
    // Mock returning no character from the databse
    (CharacterDb.findById as jest.Mock).mockImplementationOnce(() => null);

    const req = mockRequest({ id: "jim" }, { damageType: "acid", damageAmount: 10 });
    const res = mockResponse();

    await damageCharacter(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Character not found" });
  });

  it("If a character is found it should apply damage and return 200", async () => {
    const startingHitPoints: HitPoints = {
      currentHitPoints: 50,
      tempHitPoints: 10,
      hitPoints: 400,
    };

    const finalHitPoints: HitPoints = {
      currentHitPoints: 30,
      tempHitPoints: 10,
      hitPoints: 400,
    };

    // mock character with no defenses
    // all relevant data is visible in the test
    // all irrelevant data is hidden
    const character = {
      ...testCharacter,
      ...startingHitPoints,
      defenses: [
        {
          defense: DefenseType.Resistance,
          type: DamageType.Fire,
        },
      ],
    };

    // Mock returning the character from the mongoose Model API
    // .lean() is called on the returned object in the real implementation
    // mock an object with a fn 'lean' that returns a Character
    (CharacterDb.findById as jest.Mock).mockImplementationOnce(() => ({
      lean: jest.fn().mockReturnValue(character),
    }));

    // return value does not matter, return an empty object
    (CharacterDb.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {});

    // Mock the logic functions to ensure expected result
    (checkDefenceAgainstDamageType as jest.Mock).mockImplementationOnce(
      () => DefenseType.Resistance,
    );
    (extractHitpoints as jest.Mock).mockImplementationOnce(() => startingHitPoints);
    (calcAppliedDamage as jest.Mock).mockImplementationOnce(() => 10);
    (damageHitPoints as jest.Mock).mockImplementationOnce(() => finalHitPoints);

    // Mock requests - character will be Resistant to Fire
    const req = mockRequest({ id: character._id }, { damageType: "fire", damageAmount: 20 });
    const res = mockResponse();

    await damageCharacter(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: character._id,
      name: character.name,
      base_damage: 20,
      damage_recieved: 10,
      damage_type_recieved: DamageType.Fire,
      defense_against_damage: DefenseType.Resistance,
      original_hit_points: startingHitPoints,
      updated_hit_points: finalHitPoints,
    });
  });

  it("should return 500 if an error occurs", async () => {
    (CharacterDb.findById as jest.Mock).mockImplementationOnce(() => {
      throw new Error();
    });

    const req = mockRequest({ id: "grindle" }, { damageType: "radiant", damageAmount: 10 });
    const res = mockResponse();

    await damageCharacter(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something went terribly wrong...",
      error: expect.any(Error),
    });
  });
});
