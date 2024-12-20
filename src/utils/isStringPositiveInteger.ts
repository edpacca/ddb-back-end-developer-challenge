/**
 * Check if a string can be converted successfully an integer number above 0.
 * @param input - The string to check.
 * @returns True if the string is an integer greater than 0, false otherwise.
 */
export function isStringPositiveInteger(input: string): boolean {
  const number = Number(input);
  return Number.isInteger(number) && number > 0;
}
