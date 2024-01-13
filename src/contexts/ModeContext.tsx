import React, { createContext, useState } from "react";
import { hexChars, standaloneSymbols } from "../consts/symbols";

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

  const addToExpression = (value: string) => {
    if (value === "CLR") return clearExpression();
    if (value === "=") return evaluateExpression();
    if (
      (standaloneSymbols.includes(
        expression[currentMode].replaceAll(" ", "").slice(-1)
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
        (!hexChars.includes(value) ? ` ${value} ` : value),
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
