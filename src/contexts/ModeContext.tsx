import React, { createContext, useState } from "react";

export type ModeType = "numeric" | "systemic";

export const modes = {
  NUMERIC: "numeric" as ModeType,
  SYSTEMIC: "systemic" as ModeType,
};

export const modeContext = createContext<{
  mode: ModeType;
  selectMode: (mode: ModeType) => void;
}>({
  mode: modes.NUMERIC,
  selectMode: () => {},
});

interface ModeContextProps {
  children?: React.ReactNode;
}

const ModeContext: React.FC<ModeContextProps> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<ModeType>(
    modes.NUMERIC as ModeType
  );

  const selectMode = (mode: ModeType) => {
    setCurrentMode(mode);
  };

  return (
    <>
      <modeContext.Provider value={{ mode: currentMode, selectMode }}>
        {children}
      </modeContext.Provider>
    </>
  );
};

export default ModeContext;
