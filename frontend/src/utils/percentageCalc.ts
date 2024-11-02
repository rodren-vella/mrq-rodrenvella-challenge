/**
 * Function which calculates the percentage difference between 2 numbers
 *
 * @param {number} num1
 * @param {number} num2
 * @returns {number} Percentage difference between the 2 numbers
 */

export const percentageChangeCalc = (num1: number, num2: number): number =>
  Math.abs(((num2 - num1) / num1) * 100);
