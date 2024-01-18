import React, { createContext, useState } from "react";
import {
  OPERATORS,
  hexChars,
  standaloneOperators,
  standaloneSymbols,
} from "../consts/symbols";
import { sanitizeExpression } from "../utils/sanitizeExpression";

export type ModeType = "numeric" | "systemic";

export const modes = {
  NUMERIC: "numeric" as ModeType,
  SYSTEMIC: "systemic" as ModeType,
};

export const modeContext = createContext<{
  mode: ModeType;
  expression: {
    numeric: string;
    systemic: string;
  };
  selectMode: (mode: ModeType) => void;
  clearExpression: () => void;
  addToExpression: (value: string) => void;
}>({
  mode: modes.NUMERIC,
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

  const parenthesizeExpression = () => {
    const currentExpression = expression[currentMode];
    console.log(currentExpression);
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
        } (`,
      });

    if (!currentExpression.includes("(") || isLastCharSymbol || !right.length)
      return setExpression({
        ...expression,
        [currentMode]: `${currentExpression}(`,
      });
    return setExpression({
      ...expression,
      [currentMode]: `${currentExpression})`,
    });
  };

  const addToExpression = (value: string) => {
    const currentNode = expression[currentMode].substring(
      expression[currentMode].lastIndexOf(" ") + 1
    );
    if (
      (standaloneSymbols.includes(value) ||
        standaloneOperators.includes(value)) &&
      !sanitizeExpression(expression[currentMode]).length &&
      !["-", OPERATORS.NOT].includes(value)
    )
      return;
    if (currentNode.includes(".") && value === ".") return;
    if (value === "CLR") return clearExpression();
    if (value === "=") return evaluateExpression();
    if (value === "()") return parenthesizeExpression();
    if (
      standaloneOperators.includes(
        sanitizeExpression(expression[currentMode]).slice(-1)
      )
    )
      return;
    if (
      (standaloneSymbols.includes(
        sanitizeExpression(expression[currentMode]).slice(-1)
      ) &&
        (standaloneSymbols.includes(value) ||
          value.includes("pow") ||
          value.includes("sqrt"))) ||
      value.includes("(")
    )
      return;

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
        }}
      >
        {children}
      </modeContext.Provider>
    </>
  );
};

export default ModeContext;
