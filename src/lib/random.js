// @flow

/**
 * Get a random floating point number between `min` and `max`.
 */
export const randomFloat = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

/**
 * Get a random integer between `min` and `max`.
 */
export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Get a random boolean value.
 */
export const randomBool = (): boolean => Math.random() >= 0.5;
