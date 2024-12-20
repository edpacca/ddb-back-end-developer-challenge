import fs from "fs/promises";
import path from "path";
import { Character } from "../model/interface/character";

export class CharacterRepository {
  private data: Character[] = [];

  /**
   * Instantiates the class and reads the JSON file into the `data` array.
   * If no file provided it will load the default character file
   * @param filePath - Path to the JSON file.
   */
  constructor(filePath: string = `__dirname/data/briv.json`) {
    this.loadData(filePath);
  }

  /**
   * Reads the JSON file and populates the `data` array.
   */
  private async loadData(filePath: string): Promise<void> {
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const fileName = path.basename(filePath);
      const loadedCharacterData = JSON.parse(fileContent);
      const hydratedCharacterData: Character = {
        ...loadedCharacterData,
        _id: fileName,
        currentHitPoints: loadedCharacterData.hitPoints,
        tempHitPoints: 0,
      };
      this.add(hydratedCharacterData);
    } catch (error) {
      console.error("Error reading the JSON file:", error);
      this.data = []; // Initialize as empty if file reading fails
    }
  }

  /**
   * Gets an object by its ID.
   * uses promises to simulate a database transaction
   * @param id - The ID of the object to retrieve.
   * @returns The object with the specified ID or `undefined` if not found.
   */
  public async getById(id: string): Promise<Character | undefined> {
    return new Promise((resolve) => {
      const character = this.data.find((c) => c._id === id);
      resolve(character);
    });
  }

  /**
   * Adds a new object to the database.
   * @param character - The object to add.
   * @returns The added object.
   */
  public async add(character: Character): Promise<Character> {
    return new Promise((resolve, reject) => {
      const existingChar: Character | undefined = this.data.find((c) => c._id == character._id);
      if (existingChar) {
        reject("Character with this _id already exists");
      } else {
        this.data.push(character);
      }
      resolve(character);
    });
  }

  /**
   * Updates an object by its ID.
   * uses promises to simulate a database transaction
   * @param id - The ID of the object to update.
   * @param updates - The partial updates to apply to the object.
   * @returns The updated object or `null` if not found.
   */
  public async updateById(id: string, updates: Partial<Character>): Promise<Character | undefined> {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex((character) => character._id === id);
      if (index === -1) {
        resolve(undefined);
      } else {
        this.data[index] = { ...this.data[index], ...updates };
        resolve(this.data[index]);
      }
    });
  }

  /**
   * Deletes an object by its ID.
   * uses promises to simulate a database transaction
   * @param id - The ID of the object to delete.
   * @returns `true` if the object was deleted, `false` if not found.
   */
  public async deleteById(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex((character) => character._id === id);
      if (index === -1) {
        resolve(false);
      } else {
        this.data.splice(index, 1);
        resolve(true);
      }
    });
  }
}
