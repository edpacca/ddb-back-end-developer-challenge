// this is to separate the database logic from the rest of the application
// in principle we should be able to compeletely swap out the database and ODM/ORM if it complies with this interface
import config from "../config";

import CharacterDb from "../model/schema/CharacterSchema";

class RepositInterface {
  constructor()
}
if (config.env === "production") {
  const findCharacterById = CharacterDb.findById;
  const findCharacterByIdAndUpdate = CharacterDb.findByIdAndUpdate;
  const findCharacterByIdAndDelete = CharacterDb.findByIdAndDelete;
} else {
  const findCharacterById = .findById;
  const findCharacterByIdAndUpdate = CharacterDb.findByIdAndUpdate;
  const findCharacterByIdAndDelete = CharacterDb.findByIdAndDelete;
}
