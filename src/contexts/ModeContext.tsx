import React, { createContext, useState } from "react";

export type ModeType = "numeric" | "systemic";

export const modes = {
  NUMERIC: "numeric" as ModeType,
  SYSTEMIC: "systemic" as ModeType,
};

export const systems = ["BIN", "OCT", "DEC", "HEX"] as const;
export const systemValues = {
  BIN: 2,
  OCT: 8,
  DEC: 10,
  HEX: 16,
};
export const hexChars = "0123456789ABCDEF";

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

  const addToExpression = (value: string) => {
    setExpression({
      ...expression,
      [currentMode]:
        expression[currentMode] +
        `${!hexChars.includes(value) ? " " : ""}${value}`,
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
