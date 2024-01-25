export const SYSTEMS = {
  BIN: "BIN",
  OCT: "OCT",
  DEC: "DEC",
  HEX: "HEX",
} as const;

export const PI = {
  symbol: "π",
  slug: "PI",
};

export type SystemType = keyof typeof SYSTEMS;

export const systemValues = {
  BIN: 2,
  OCT: 8,
  DEC: 10,
  HEX: 16,
};
export const hexChars = "0123456789ABCDEF";

export const OPERATORS = {
  AND: "∧",
  OR: "∨",
  NOT: "¬",
  NAND: "↑",
  NOR: "↓",
  XOR: "⊻",
};

export const STANDARD_OPERATORS = {
  AND: "&",
  OR: "|",
  NOT: "!",
  NAND: "NAND",
  NOR: "NOR",
  XOR: "XOR",
};

export const STANDARD_OPERATORS_VALUES = Object.values(STANDARD_OPERATORS);
export const OPERATORS_VALUES = Object.values(OPERATORS);

export const standaloneSymbols = ["%", "π", "e", "/", "*", "-", "+", "="];
export const standaloneOperators = [
  OPERATORS.AND,
  OPERATORS.OR,
  OPERATORS.NAND,
  OPERATORS.NOR,
  OPERATORS.XOR,
] as const;

export const numbersChars = hexChars + PI.symbol + "e";
