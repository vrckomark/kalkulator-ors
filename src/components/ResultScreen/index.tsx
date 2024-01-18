import { useContext } from "react";
import { modeContext } from "../../contexts/ModeContext";

const ResultScreen = () => {
  const { expression, mode } = useContext(modeContext);
  return (
    <div className="w-full flex justify-center gap-4 items-end flex-col h-full pr-4">
      <p className="text-[44px] font-medium">{expression[mode]}</p>
      <p className="text-3xl opacity-50 font-medium">{0}</p>
    </div>
  );
};

export default ResultScreen;
