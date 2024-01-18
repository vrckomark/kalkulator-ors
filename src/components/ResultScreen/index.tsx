import { useContext } from "react";
import { modeContext } from "../../contexts/ModeContext";
import { systemValues } from "../../consts/symbols";

const ResultScreen = () => {
  const { expression, mode, selectedSystem: system } = useContext(modeContext);
  return (
    <div className="w-full relative flex justify-center gap-4 items-end flex-col h-full pr-4">
      <p className="text-[44px] font-medium">{expression[mode]}</p>
      <p className="text-3xl opacity-50 font-medium">{0}</p>
      <p className="absolute right-0 bottom-0 text-2xl font-medium p-4 tracking-wider">
        {system} ({systemValues[system]})
      </p>
    </div>
  );
};

export default ResultScreen;
