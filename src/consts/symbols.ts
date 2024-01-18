export const systems = ["BIN", "OCT", "DEC", "HEX"] as const;
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
export const standaloneOperators = Object.values(OPERATORS);
