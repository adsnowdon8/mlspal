export function convertStringToNumber(value: string): number {
  return parseInt(value.replace(/,/g, ""));
}
