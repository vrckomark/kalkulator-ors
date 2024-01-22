import { useContext, useRef, useState } from "react";
import { modeContext } from "../../contexts/ModeContext";
import { systemValues } from "../../consts/symbols";
import { useResultScreen } from "./hooks/useResultScreen";

const ResultScreen = () => {
  const { expression, mode, selectedSystem: system } = useContext(modeContext);

  const { inputRef, onKeyboardInput } = useResultScreen();

  return (
    <div className="w-full relative flex justify-center gap-4 items-end flex-col h-full pr-4">
      <input
        ref={inputRef}
        value={expression[mode]}
        autoFocus
        onChange={onKeyboardInput}
        className="text-[44px] font-medium bg-transparent text-right outline-none w-full"
      ></input>
      <p className="text-3xl opacity-50 font-medium">{0}</p>
      <p className="absolute right-0 bottom-0 text-2xl font-medium p-4 tracking-wider">
        {system} ({systemValues[system]})
      </p>
    </div>
  );
};

export default ResultScreen;
