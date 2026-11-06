export function rgb(hex: string): [number, number, number];

export function related(
  hex: string,
  rng: { range(min: number, max: number): number },
  alpha: number,
): string;

export function mixColors(from: string, to: string, amount: number): string;
