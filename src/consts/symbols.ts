export const SYSTEMS = {
  BIN: "BIN",
  OCT: "OCT",
  DEC: "DEC",
  HEX: "HEX",
} as const;

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

export const standaloneSymbols = ["%", "π", "e", "/", "*", "-", "+", "="];
export const standaloneOperators = [
  OPERATORS.AND,
  OPERATORS.OR,
  OPERATORS.NAND,
  OPERATORS.NOR,
  OPERATORS.XOR,
] as const;
