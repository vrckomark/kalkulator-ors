/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";
import {
  OPERATORS,
  SYSTEMS,
  SystemType,
  hexChars,
  standaloneOperators,
  standaloneSymbols,
} from "../consts/symbols";
import { sanitizeExpression } from "../utils/sanitizeExpression";

export type ModeType = "numeric" | "systemic";

export const modes = {
  NUMERIC: "numeric" as ModeType,
  SYSTEMIC: "systemic" as ModeType,
} as const;

export const modeContext = createContext<{
  mode: ModeType;
  expression: {
    numeric: string;
    systemic: string;
  };
  selectedSystem: SystemType;
  selectMode: (mode: ModeType) => void;
  clearExpression: () => void;
  addToExpression: (value: string) => void;
}>({
  mode: modes.NUMERIC,
  selectedSystem: SYSTEMS.DEC,
  selectMode: () => {},
  expression: {
    numeric: "",
    systemic: "",
  },
  clearExpression: () => {},
  addToExpression: () => {},
});

interface ModeContextProps {
  children?: React.ReactNode;
}

const ModeContext: React.FC<ModeContextProps> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<ModeType>(
    modes.NUMERIC as ModeType
  );
  const [selectedSystem, setSelectedSystem] = useState<keyof typeof SYSTEMS>(
    SYSTEMS.DEC
  );
  const [expression, setExpression] = useState({ systemic: "", numeric: "" });

  const selectMode = (mode: ModeType) => {
    setCurrentMode(mode);
  };

  const clearExpression = () => {
    setExpression({ ...expression, [currentMode]: "" });
  };

  const evaluateExpression = () => {
    //evaluate
    setExpression({ ...expression, [currentMode]: "15" });
  };

  const canAddToExpression = (value: string) => {
    const currentNode = expression[currentMode].substring(
      expression[currentMode].lastIndexOf(" ") + 1
    );
    return !(
      ((standaloneSymbols.includes(value) || // 1
        standaloneOperators.includes(value)) &&
        !sanitizeExpression(expression[currentMode]).length &&
        !["-", OPERATORS.NOT].includes(value)) ||
      (currentNode.includes(".") && value === ".") || // 2
      (standaloneOperators.includes(
        // 3
        sanitizeExpression(expression[currentMode]).slice(-1)
      ) &&
        standaloneOperators.includes(value)) || // 4
      (standaloneSymbols.includes(
        sanitizeExpression(expression[currentMode]).slice(-1)
      ) &&
        (standaloneSymbols.includes(value) ||
          value.includes("pow") ||
          value.includes("sqrt"))) ||
      value.includes("(") ||
      // 5
      (sanitizeExpression(expression[currentMode]).slice(-1) ===
        OPERATORS.NOT &&
        standaloneOperators.includes(value)) ||
      (value === OPERATORS.NOT &&
        hexChars.includes(
          sanitizeExpression(expression[currentMode]).slice(-1)
        ) &&
        sanitizeExpression(expression[currentMode]).length) ||
      (sanitizeExpression(expression[currentMode]).slice(-1) === "(" &&
        { numeric: standaloneSymbols, systemic: standaloneOperators }[
          currentMode
        ].includes(value) &&
        value !== "-")
    );
  };

  const parenthesizeExpression = () => {
    const currentExpression = expression[currentMode];
    const right = currentExpression.substring(
      currentExpression.lastIndexOf("(") + 1
    );
    const isLastCharSymbol = {
      numeric: standaloneSymbols,
      systemic: standaloneOperators,
    }[currentMode].some(
      (symbol) => sanitizeExpression(right).slice(-1) === symbol
    );
    if (
      currentExpression.split("(").length - 1 ===
        currentExpression.split(")").length - 1 &&
      sanitizeExpression(currentExpression).length
    )
      return setExpression({
        ...expression,
        [currentMode]: `${currentExpression} ${
          !isLastCharSymbol
            ? { numeric: "*", systemic: OPERATORS.AND }[currentMode]
            : ""
        } ( `,
      });

    if (!currentExpression.includes("(") || isLastCharSymbol || !right.length)
      return setExpression({
        ...expression,
        [currentMode]: `${currentExpression}( `,
      });
    return setExpression({
      ...expression,
      [currentMode]: `${currentExpression} )`,
    });
  };

  const addToExpression = (value: string) => {
    if (value === "CLR") return clearExpression();
    if (value === "=") return evaluateExpression();
    if (value === "()") return parenthesizeExpression();
    if (Object.values(SYSTEMS).includes(value as SystemType))
      return setSelectedSystem(value as SystemType);
    if (!canAddToExpression(value)) return;

    setExpression({
      ...expression,
      [currentMode]:
        expression[currentMode] +
        (hexChars.includes(value) || value === "." ? value : ` ${value} `),
    });
  };

  return (
    <>
      <modeContext.Provider
        value={{
          mode: currentMode,
          selectMode,
          expression,
          addToExpression,
          clearExpression,
          selectedSystem,
        }}
      >
        {children}
      </modeContext.Provider>
    </>
  );
};

export default ModeContext;
