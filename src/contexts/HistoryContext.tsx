/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";
import { HistoryType } from "../components/ResultScreen/hooks/useResultScreen";

export const historyContext = createContext<{
  history: HistoryType[];
  addToHistory: (expression: string, result: string) => void;
  clearHistory: () => void;
}>({
  history: [],
  addToHistory: () => {},
  clearHistory: () => {},
});

interface ModeContextProps {
  children?: React.ReactNode;
}

const HistoryContext: React.FC<ModeContextProps> = ({ children }) => {
  const [history, setHistory] = useState<HistoryType[]>([]);

  const addToHistory = (expression: string, result: string) => {
    setHistory((prev) => [...prev, { expression, result }]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <>
      <historyContext.Provider
        value={{
          history,
          addToHistory,
          clearHistory,
        }}
      >
        {children}
      </historyContext.Provider>
    </>
  );
};

export default HistoryContext;
