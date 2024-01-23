/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";
import { SYSTEMS, SystemType } from "../consts/symbols";

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
  setCurrentExpression: (expression: string) => void;
  setCurrentSystem: (system: keyof typeof SYSTEMS) => void;
}>({
  mode: modes.NUMERIC,
  selectedSystem: SYSTEMS.DEC,
  selectMode: () => {},
  expression: {
    numeric: "",
    systemic: "",
  },
  setCurrentExpression: () => {},
  setCurrentSystem: () => {},
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

  const setCurrentExpression = (expression: string) => {
    setExpression((prev) => ({
      ...prev,
      [currentMode]: expression,
    }));
  };

  const setCurrentSystem = (system: keyof typeof SYSTEMS) => {
    setSelectedSystem(system);
  };

  return (
    <>
      <modeContext.Provider
        value={{
          mode: currentMode,
          setCurrentExpression,
          selectMode,
          expression,
          selectedSystem,
          setCurrentSystem,
        }}
      >
        {children}
      </modeContext.Provider>
    </>
  );
};

export default ModeContext;
