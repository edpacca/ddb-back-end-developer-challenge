// this is to separate the database logic from the rest of the application
// in principle we should be able to compeletely swap out the database and ODM/ORM if it complies with this interface
import { Query } from "mongoose";
import config from "../config";
import { Character } from "../models/interfaces/character";

import CharacterDb from "../models/schema/CharacterSchema";
import { CharacterRepository } from "./localCharacterRepository";

class RepositoryInterface {
  public createCharacter: (character: Character) => Promise<Character>;
  public findCharacterById: (id: string) => Promise<Character | undefined | null>; // mongoose returns null instead of undefined
  public findCharacterByIdAndDelete: (id: string) => Promise<boolean | null>;
  public findCharacterByIdAndUpdate: (
    id: string,
    updates: Partial<Character>,
    options?: object,
  ) => Promise<Character | undefined | null>;

  constructor() {
    if (config.env === "production") {
      this.createCharacter = (character: Character) => CharacterDb.create(character);
      this.findCharacterById = (id: string) => CharacterDb.findById(id)?.lean();
      this.findCharacterByIdAndUpdate = (
        id: string,
        updates: Partial<Character>,
        options?: object,
      ) => CharacterDb.findByIdAndUpdate(id, updates, options);
      this.findCharacterByIdAndDelete = (id: string) => CharacterDb.findByIdAndDelete(id);
      if (config.debug) {
        console.log("Using database storage.");
      }
    } else {
      // could use dependency injection
      // however here it is safer to just rely on the config environment to align with the db setup
      const localRepository = new CharacterRepository();
      this.createCharacter = (character: Character) => localRepository.add(character);
      this.findCharacterById = (id: string) => localRepository.getById(id);
      this.findCharacterByIdAndUpdate = (
        id: string,
        updates: Partial<Character>,
        options?: object,
      ) => localRepository.updateById(id, updates, options);
      this.findCharacterByIdAndDelete = (id: string) => localRepository.deleteById(id);
      if (config.debug) {
        console.log("Using in memory storage.");
      }
    }
  }
}

const repositoryInterfaceService = new RepositoryInterface();
export default repositoryInterfaceService;
