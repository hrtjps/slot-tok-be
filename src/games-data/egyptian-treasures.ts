interface LinePosition {
  [key: number]: number[]; // Each line position is an array of numbers
}

interface SymbolMultiplier {
  count: number;
  multiplier: number;
}

interface SymbolsMultipliers {
  [key: number]: SymbolMultiplier[]; // Maps symbol IDs to their multipliers
}

const linesPositions: LinePosition[] = [ // Define as a 3D array of numbers
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
  ],
  [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ],
  [
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
  ],
  [
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ],
  [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
  ],
  [
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 1, 0, 0],
  ],
];

const symbolsMultipliers: SymbolsMultipliers = { // Define symbolsMultipliers with type
  1: [
    { count: 3, multiplier: 1 },
    { count: 4, multiplier: 2 },
    { count: 5, multiplier: 3 },
  ],
  2: [
    { count: 3, multiplier: 1 },
    { count: 4, multiplier: 2 },
    { count: 5, multiplier: 3 },
  ],
  3: [
    { count: 3, multiplier: 2 },
    { count: 4, multiplier: 3 },
    { count: 5, multiplier: 4 },
  ],
  4: [
    { count: 3, multiplier: 2 },
    { count: 4, multiplier: 3 },
    { count: 5, multiplier: 4 },
  ],
  5: [
    { count: 3, multiplier: 5 },
    { count: 4, multiplier: 10 },
    { count: 5, multiplier: 15 },
  ],
  6: [
    { count: 3, multiplier: 6 },
    { count: 4, multiplier: 11 },
    { count: 5, multiplier: 16 },
  ],
  7: [
    { count: 3, multiplier: 7 },
    { count: 4, multiplier: 12 },
    { count: 5, multiplier: 18 },
  ],
  8: [
    { count: 3, multiplier: 8 },
    { count: 4, multiplier: 15 },
    { count: 5, multiplier: 20 },
  ],
  9: [
    { count: 3, multiplier: 10 },
    { count: 4, multiplier: 20 },
    { count: 5, multiplier: 30 },
  ],
  10: [
    { count: 3, multiplier: 12 },
    { count: 4, multiplier: 23 },
    { count: 5, multiplier: 35 },
  ],
  11: [
    { count: 3, multiplier: 15 },
    { count: 4, multiplier: 30 },
    { count: 5, multiplier: 40 },
  ],
  12: [
    { count: 3, multiplier: 20 },
    { count: 4, multiplier: 50 },
    { count: 5, multiplier: 100 },
  ],
};

export const reelsCount: number = 5;
export const reelPositions: number = 3;
export const symbolsCount: number = 12;

export default {
  reelsCount,
  reelPositions,
  symbolsCount,
  linesPositions,
  symbolsMultipliers,
};
