export function padNumberToFourDigits(number: number): string {
  return number.toString().padStart(4, "0");
}
